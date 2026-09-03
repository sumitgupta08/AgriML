// Soil Health Degradation Tracker
// Tracks nutrient levels over time, predicts degradation, adjusts recommendations

const STORAGE_KEY = 'agriml_soil_history';

export class SoilHealthTracker {
    constructor() {
        this.history = this._loadHistory();
    }

    _loadHistory() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch { return []; }
    }

    _saveHistory() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.history.slice(-100)));
        } catch { /* storage full */ }
    }

    record(input) {
        this.history.push({
            timestamp: Date.now(),
            nitrogen: input.nitrogen,
            phosphorus: input.phosphorus,
            potassium: input.potassium,
            pH: input.pH,
            moisture: input.moisture,
            crop: input.crop
        });
        this._saveHistory();
    }

    getHistory() {
        return [...this.history];
    }

    // Predict future soil health using linear trend projection
    predictDegradation(months = 6) {
        if (this.history.length < 2) return null;

        const nutrients = ['nitrogen', 'phosphorus', 'potassium', 'pH'];
        const predictions = {};

        for (const nutrient of nutrients) {
            const values = this.history.map((h, i) => ({ x: i, y: h[nutrient] }));
            const trend = this._linearTrend(values);
            const futureSteps = this.history.length + months;

            predictions[nutrient] = {
                current: values[values.length - 1].y,
                predicted: Math.max(0, trend.slope * futureSteps + trend.intercept),
                trend: trend.slope < -0.5 ? 'declining' : trend.slope > 0.5 ? 'improving' : 'stable',
                ratePerMonth: Math.round(trend.slope * 100) / 100,
                healthScore: this._nutrientHealthScore(nutrient, values[values.length - 1].y)
            };
        }

        // Overall soil health score (0-100)
        const overallHealth = Math.round(
            Object.values(predictions).reduce((s, p) => s + p.healthScore, 0) / nutrients.length
        );

        return {
            predictions,
            overallHealth,
            dataPoints: this.history.length,
            recommendations: this._degradationRecommendations(predictions)
        };
    }

    _linearTrend(points) {
        const n = points.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
        for (const { x, y } of points) {
            sumX += x; sumY += y; sumXY += x * y; sumXX += x * x;
        }
        const denom = n * sumXX - sumX * sumX;
        const slope = denom !== 0 ? (n * sumXY - sumX * sumY) / denom : 0;
        const intercept = (sumY - slope * sumX) / n;
        return { slope, intercept };
    }

    _nutrientHealthScore(nutrient, value) {
        const optimalRanges = {
            nitrogen: [40, 120], phosphorus: [30, 70], potassium: [25, 60], pH: [5.5, 7.5]
        };
        const [min, max] = optimalRanges[nutrient] || [0, 100];
        const mid = (min + max) / 2;
        const dist = Math.abs(value - mid) / (max - min);
        return Math.round(Math.max(0, Math.min(100, (1 - dist) * 100)));
    }

    _degradationRecommendations(predictions) {
        const recs = [];
        for (const [nutrient, data] of Object.entries(predictions)) {
            if (data.trend === 'declining') {
                recs.push(`${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} is declining at ${Math.abs(data.ratePerMonth)}/reading. Consider supplementation.`);
            }
            if (data.healthScore < 40) {
                recs.push(`${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} health is poor (${data.healthScore}/100). Urgent attention needed.`);
            }
        }
        if (recs.length === 0) recs.push('Soil health is stable. Continue current management practices.');
        return recs;
    }

    clearHistory() {
        this.history = [];
        localStorage.removeItem(STORAGE_KEY);
    }
}
