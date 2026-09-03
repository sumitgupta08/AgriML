// Random Forest Classifier for Fertilizer Recommendation
// Lightweight client-side implementation

import { extractFeatures } from './preprocessing.js';

class DecisionTreeClassifier {
    constructor(maxDepth = 10, minSamples = 5, featureSubsetRatio = 0.7) {
        this.maxDepth = maxDepth;
        this.minSamples = minSamples;
        this.featureSubsetRatio = featureSubsetRatio;
        this.tree = null;
    }

    _gini(groups, classes) {
        const totalSamples = groups.reduce((s, g) => s + g.length, 0);
        if (totalSamples === 0) return 0;
        let gini = 0;
        for (const group of groups) {
            const size = group.length;
            if (size === 0) continue;
            let score = 0;
            for (const cls of classes) {
                const count = group.filter(r => r.label === cls).length;
                const p = count / size;
                score += p * p;
            }
            gini += (1 - score) * (size / totalSamples);
        }
        return gini;
    }

    _bestSplit(data, featureIndices) {
        const classes = [...new Set(data.map(d => d.label))];
        let bestIdx = 0, bestVal = 0, bestScore = Infinity, bestGroups = null;

        for (const idx of featureIndices) {
            const values = [...new Set(data.map(d => d.features[idx]))].sort((a, b) => a - b);
            // Sample thresholds for speed
            const step = Math.max(1, Math.floor(values.length / 20));
            for (let i = 0; i < values.length; i += step) {
                const val = values[i];
                const left = data.filter(d => d.features[idx] < val);
                const right = data.filter(d => d.features[idx] >= val);
                const gini = this._gini([left, right], classes);
                if (gini < bestScore) {
                    bestIdx = idx;
                    bestVal = val;
                    bestScore = gini;
                    bestGroups = [left, right];
                }
            }
        }

        return { index: bestIdx, value: bestVal, groups: bestGroups, score: bestScore };
    }

    _majority(data) {
        const counts = {};
        data.forEach(d => counts[d.label] = (counts[d.label] || 0) + 1);
        return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    }

    _buildTree(data, depth, numFeatures) {
        if (data.length <= this.minSamples || depth >= this.maxDepth) {
            return { leaf: true, value: this._majority(data), counts: this._classCounts(data), size: data.length };
        }

        const classes = new Set(data.map(d => d.label));
        if (classes.size === 1) {
            return { leaf: true, value: data[0].label, counts: this._classCounts(data), size: data.length };
        }

        // Random feature subset
        const allIndices = Array.from({ length: numFeatures }, (_, i) => i);
        const subsetSize = Math.max(1, Math.floor(numFeatures * this.featureSubsetRatio));
        const featureIndices = this._shuffleArray(allIndices).slice(0, subsetSize);

        const split = this._bestSplit(data, featureIndices);
        if (!split.groups || split.groups[0].length === 0 || split.groups[1].length === 0) {
            return { leaf: true, value: this._majority(data), counts: this._classCounts(data), size: data.length };
        }

        return {
            leaf: false,
            index: split.index,
            value: split.value,
            left: this._buildTree(split.groups[0], depth + 1, numFeatures),
            right: this._buildTree(split.groups[1], depth + 1, numFeatures)
        };
    }

    _classCounts(data) {
        const counts = {};
        data.forEach(d => counts[d.label] = (counts[d.label] || 0) + 1);
        return counts;
    }

    _shuffleArray(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    train(data) {
        const numFeatures = data[0].features.length;
        this.tree = this._buildTree(data, 0, numFeatures);
    }

    predict(features) {
        let node = this.tree;
        while (!node.leaf) {
            if (features[node.index] < node.value) {
                node = node.left;
            } else {
                node = node.right;
            }
        }
        return node;
    }
}

export class RandomForestClassifier {
    constructor(numTrees = 15, maxDepth = 12, minSamples = 3) {
        this.numTrees = numTrees;
        this.maxDepth = maxDepth;
        this.minSamples = minSamples;
        this.trees = [];
        this.trained = false;
        this.featureImportance = null;
    }

    train(trainingData, cropTypes) {
        this.cropTypes = cropTypes;
        const data = trainingData.map(d => ({
            features: extractFeatures(d, cropTypes),
            label: d.fertilizer
        }));

        this.trees = [];
        for (let i = 0; i < this.numTrees; i++) {
            // Bootstrap sample
            const sample = [];
            for (let j = 0; j < data.length; j++) {
                sample.push(data[Math.floor(Math.random() * data.length)]);
            }
            const tree = new DecisionTreeClassifier(this.maxDepth, this.minSamples, 0.6);
            tree.train(sample);
            this.trees.push(tree);
        }

        this.trained = true;
    }

    predict(input) {
        if (!this.trained) throw new Error('Model not trained');
        const features = extractFeatures(input, this.cropTypes);

        const votes = {};
        const allCounts = {};

        for (const tree of this.trees) {
            const result = tree.predict(features);
            votes[result.value] = (votes[result.value] || 0) + 1;
            // Aggregate class probabilities
            if (result.counts) {
                for (const [cls, count] of Object.entries(result.counts)) {
                    allCounts[cls] = (allCounts[cls] || 0) + count;
                }
            }
        }

        // Find majority vote
        const sorted = Object.entries(votes).sort((a, b) => b[1] - a[1]);
        const predicted = sorted[0][0];
        const confidence = sorted[0][1] / this.numTrees;

        // Compute probabilities
        const totalCounts = Object.values(allCounts).reduce((s, v) => s + v, 0) || 1;
        const probabilities = {};
        for (const [cls, count] of Object.entries(allCounts)) {
            probabilities[cls] = count / totalCounts;
        }

        return {
            fertilizer: predicted,
            confidence: Math.round(confidence * 100) / 100,
            probabilities,
            allVotes: votes
        };
    }
}
