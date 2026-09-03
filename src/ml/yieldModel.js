// Gradient Boosting Regressor for Yield Prediction
// Client-side implementation using sequential weak learners (decision stumps)

import { extractFeatures } from './preprocessing.js';

class DecisionStumpRegressor {
    constructor(maxDepth = 4) {
        this.maxDepth = maxDepth;
        this.tree = null;
    }

    _mse(values) {
        if (values.length === 0) return 0;
        const mean = values.reduce((s, v) => s + v, 0) / values.length;
        return values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length;
    }

    _bestSplit(data, depth) {
        if (data.length <= 5 || depth >= this.maxDepth) {
            const mean = data.reduce((s, d) => s + d.target, 0) / data.length;
            return { leaf: true, value: mean, count: data.length };
        }

        const numFeatures = data[0].features.length;
        let bestIdx = 0, bestVal = 0, bestScore = Infinity;
        let bestLeft = null, bestRight = null;

        for (let idx = 0; idx < numFeatures; idx++) {
            const sorted = [...data].sort((a, b) => a.features[idx] - b.features[idx]);
            const step = Math.max(1, Math.floor(sorted.length / 15));
            for (let i = step; i < sorted.length; i += step) {
                const threshold = sorted[i].features[idx];
                const left = data.filter(d => d.features[idx] < threshold);
                const right = data.filter(d => d.features[idx] >= threshold);
                if (left.length === 0 || right.length === 0) continue;
                const score = (left.length * this._mse(left.map(d => d.target)) +
                    right.length * this._mse(right.map(d => d.target))) / data.length;
                if (score < bestScore) {
                    bestScore = score;
                    bestIdx = idx;
                    bestVal = threshold;
                    bestLeft = left;
                    bestRight = right;
                }
            }
        }

        if (!bestLeft) {
            const mean = data.reduce((s, d) => s + d.target, 0) / data.length;
            return { leaf: true, value: mean, count: data.length };
        }

        return {
            leaf: false,
            index: bestIdx,
            value: bestVal,
            left: this._bestSplit(bestLeft, depth + 1),
            right: this._bestSplit(bestRight, depth + 1)
        };
    }

    train(data) {
        this.tree = this._bestSplit(data, 0);
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
        return node.value;
    }
}

export class GradientBoostingRegressor {
    constructor(numEstimators = 50, learningRate = 0.1, maxDepth = 4) {
        this.numEstimators = numEstimators;
        this.learningRate = learningRate;
        this.maxDepth = maxDepth;
        this.estimators = [];
        this.basePrediction = 0;
        this.trained = false;
    }

    train(trainingData, cropTypes) {
        this.cropTypes = cropTypes;

        const data = trainingData.map(d => ({
            features: extractFeatures(d, cropTypes),
            target: d.yield
        }));

        // Initial prediction = mean of targets
        this.basePrediction = data.reduce((s, d) => s + d.target, 0) / data.length;

        // Compute residuals and fit sequentially
        let predictions = data.map(() => this.basePrediction);
        this.estimators = [];

        for (let i = 0; i < this.numEstimators; i++) {
            // Compute residuals
            const residualData = data.map((d, j) => ({
                features: d.features,
                target: d.target - predictions[j]
            }));

            const stump = new DecisionStumpRegressor(this.maxDepth);
            stump.train(residualData);
            this.estimators.push(stump);

            // Update predictions
            for (let j = 0; j < data.length; j++) {
                predictions[j] += this.learningRate * stump.predict(data[j].features);
            }
        }

        // Compute training RMSE for confidence estimation
        let mse = 0;
        for (let j = 0; j < data.length; j++) {
            mse += (data[j].target - predictions[j]) ** 2;
        }
        this.trainRMSE = Math.sqrt(mse / data.length);
        this.targetStd = Math.sqrt(data.reduce((s, d) => s + (d.target - this.basePrediction) ** 2, 0) / data.length);

        this.trained = true;
    }

    predict(input) {
        if (!this.trained) throw new Error('Model not trained');

        const features = extractFeatures(input, this.cropTypes);
        let prediction = this.basePrediction;

        for (const estimator of this.estimators) {
            prediction += this.learningRate * estimator.predict(features);
        }

        prediction = Math.max(0, prediction);

        // Confidence: based on how tight the prediction is relative to variance
        const relativeError = this.trainRMSE / (this.targetStd || 1);
        const confidence = Math.max(0.3, Math.min(0.98, 1 - relativeError));

        return {
            yield: Math.round(prediction * 100) / 100,
            confidence: Math.round(confidence * 100) / 100,
            rmse: Math.round(this.trainRMSE * 100) / 100,
            unit: 'tons/hectare'
        };
    }
}
