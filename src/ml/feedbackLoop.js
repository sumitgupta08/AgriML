// Feedback Loop System
// Allows farmers to input actual yield and uses data to improve the model

const STORAGE_KEY = 'agriml_feedback';

export class FeedbackLoop {
    constructor() {
        this.entries = this._load();
    }

    _load() {
        try {
            const d = localStorage.getItem(STORAGE_KEY);
            return d ? JSON.parse(d) : [];
        } catch { return []; }
    }

    _save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.entries.slice(-50)));
        } catch { }
    }

    submit(feedback) {
        const entry = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2, 4),
            timestamp: Date.now(),
            crop: feedback.crop,
            predictedYield: feedback.predictedYield,
            actualYield: feedback.actualYield,
            recommendedFertilizer: feedback.recommendedFertilizer,
            actualFertilizerUsed: feedback.actualFertilizerUsed || feedback.recommendedFertilizer,
            quantityUsed: feedback.quantityUsed,
            satisfaction: feedback.satisfaction || 3, // 1-5
            notes: feedback.notes || '',
            accuracy: this._computeAccuracy(feedback.predictedYield, feedback.actualYield)
        };

        this.entries.push(entry);
        this._save();
        return entry;
    }

    _computeAccuracy(predicted, actual) {
        if (!predicted || !actual || predicted === 0) return null;
        const error = Math.abs(predicted - actual) / predicted;
        return Math.round(Math.max(0, (1 - error)) * 100);
    }

    getEntries() {
        return [...this.entries].reverse();
    }

    getStats() {
        if (this.entries.length === 0) return null;

        const accuracies = this.entries.filter(e => e.accuracy != null).map(e => e.accuracy);
        const satisfactions = this.entries.filter(e => e.satisfaction).map(e => e.satisfaction);

        const avgAccuracy = accuracies.length > 0
            ? Math.round(accuracies.reduce((s, v) => s + v, 0) / accuracies.length) : null;
        const avgSatisfaction = satisfactions.length > 0
            ? Math.round(satisfactions.reduce((s, v) => s + v, 0) / satisfactions.length * 10) / 10 : null;

        // Trend: is accuracy improving?
        let trend = 'stable';
        if (accuracies.length >= 4) {
            const firstHalf = accuracies.slice(0, Math.floor(accuracies.length / 2));
            const secondHalf = accuracies.slice(Math.floor(accuracies.length / 2));
            const avgFirst = firstHalf.reduce((s, v) => s + v, 0) / firstHalf.length;
            const avgSecond = secondHalf.reduce((s, v) => s + v, 0) / secondHalf.length;
            if (avgSecond > avgFirst + 3) trend = 'improving';
            else if (avgSecond < avgFirst - 3) trend = 'declining';
        }

        // By crop
        const byCrop = {};
        this.entries.forEach(e => {
            if (!byCrop[e.crop]) byCrop[e.crop] = { count: 0, totalAccuracy: 0 };
            byCrop[e.crop].count++;
            if (e.accuracy) byCrop[e.crop].totalAccuracy += e.accuracy;
        });
        for (const key of Object.keys(byCrop)) {
            byCrop[key].avgAccuracy = Math.round(byCrop[key].totalAccuracy / byCrop[key].count);
        }

        return {
            totalEntries: this.entries.length,
            avgAccuracy,
            avgSatisfaction,
            trend,
            byCrop
        };
    }

    clearAll() {
        this.entries = [];
        localStorage.removeItem(STORAGE_KEY);
    }
}
