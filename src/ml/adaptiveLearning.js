// Adaptive Learning System
// Learns from previous recommendations and outcomes, improves accuracy over time

const STORAGE_KEY = 'agriml_adaptive_data';

export class AdaptiveLearningSystem {
    constructor() {
        this.data = this._load();
    }

    _load() {
        try {
            const d = localStorage.getItem(STORAGE_KEY);
            return d ? JSON.parse(d) : {
                recommendations: [],
                feedbackEntries: [],
                correctionFactors: {},
                accuracy: { predictions: 0, correct: 0 },
                personalProfiles: {}
            };
        } catch { return { recommendations: [], feedbackEntries: [], correctionFactors: {}, accuracy: { predictions: 0, correct: 0 }, personalProfiles: {} }; }
    }

    _save() {
        try {
            // Keep last 200 entries
            this.data.recommendations = this.data.recommendations.slice(-200);
            this.data.feedbackEntries = this.data.feedbackEntries.slice(-100);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        } catch { /* storage full */ }
    }

    // Record a recommendation for later evaluation
    recordRecommendation(input, fertResult, yieldResult, optResult) {
        const entry = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
            timestamp: Date.now(),
            input: { ...input },
            predicted: {
                fertilizer: fertResult.fertilizer,
                yield: yieldResult.yield,
                confidence: yieldResult.confidence,
                quantity: optResult.quantityPerHectare
            },
            actual: null, // Filled by feedback
            evaluated: false
        };
        this.data.recommendations.push(entry);
        this.data.accuracy.predictions++;

        // Build personal profile for this crop
        this._updateProfile(input);
        this._save();
        return entry.id;
    }

    // Record actual yield feedback
    recordFeedback(actualYield, actualFertUsed, cropType, satisfaction) {
        const entry = {
            timestamp: Date.now(),
            actualYield,
            actualFertUsed,
            cropType,
            satisfaction // 1-5 rating
        };

        this.data.feedbackEntries.push(entry);

        // Find most recent unmatched recommendation for this crop
        const rec = [...this.data.recommendations]
            .reverse()
            .find(r => !r.evaluated && r.input.crop === cropType);

        if (rec) {
            rec.actual = { yield: actualYield, fertilizerUsed: actualFertUsed };
            rec.evaluated = true;

            // Compute correction factor
            if (rec.predicted.yield > 0) {
                const yieldRatio = actualYield / rec.predicted.yield;
                const key = cropType;
                if (!this.data.correctionFactors[key]) {
                    this.data.correctionFactors[key] = { sum: 0, count: 0 };
                }
                this.data.correctionFactors[key].sum += yieldRatio;
                this.data.correctionFactors[key].count++;
            }

            // Track accuracy (within 20% = correct)
            const error = Math.abs(actualYield - rec.predicted.yield) / rec.predicted.yield;
            if (error < 0.2) this.data.accuracy.correct++;
        }

        this._save();
    }

    // Apply learned corrections to a yield prediction
    adjustPrediction(crop, predictedYield) {
        const factor = this.data.correctionFactors[crop];
        if (factor && factor.count >= 2) {
            const avgCorrection = factor.sum / factor.count;
            // Blend: 70% model, 30% learned correction
            const blendWeight = Math.min(0.3, factor.count * 0.05);
            return predictedYield * (1 - blendWeight + blendWeight * avgCorrection);
        }
        return predictedYield;
    }

    // Get personal profile for a crop
    getProfile(crop) {
        return this.data.personalProfiles[crop] || null;
    }

    _updateProfile(input) {
        const crop = input.crop;
        if (!this.data.personalProfiles[crop]) {
            this.data.personalProfiles[crop] = {
                avgN: 0, avgP: 0, avgK: 0, avgPH: 0,
                avgMoisture: 0, count: 0
            };
        }
        const p = this.data.personalProfiles[crop];
        p.avgN = (p.avgN * p.count + input.nitrogen) / (p.count + 1);
        p.avgP = (p.avgP * p.count + input.phosphorus) / (p.count + 1);
        p.avgK = (p.avgK * p.count + input.potassium) / (p.count + 1);
        p.avgPH = (p.avgPH * p.count + input.pH) / (p.count + 1);
        p.avgMoisture = (p.avgMoisture * p.count + input.moisture) / (p.count + 1);
        p.count++;
    }

    // Get system stats
    getStats() {
        const totalRecs = this.data.accuracy.predictions;
        const accuracy = totalRecs > 0 ? Math.round((this.data.accuracy.correct / totalRecs) * 100) : null;
        const feedbackCount = this.data.feedbackEntries.length;
        const cropProfiles = Object.keys(this.data.personalProfiles).length;

        return {
            totalRecommendations: totalRecs,
            feedbackReceived: feedbackCount,
            estimatedAccuracy: accuracy,
            cropProfiles,
            learningStatus: feedbackCount >= 5 ? 'Active' : feedbackCount >= 1 ? 'Learning' : 'Awaiting Feedback',
            correctionFactors: { ...this.data.correctionFactors }
        };
    }

    getRecentRecommendations(count = 10) {
        return this.data.recommendations.slice(-count).reverse();
    }

    clearData() {
        this.data = { recommendations: [], feedbackEntries: [], correctionFactors: {}, accuracy: { predictions: 0, correct: 0 }, personalProfiles: {} };
        localStorage.removeItem(STORAGE_KEY);
    }
}
