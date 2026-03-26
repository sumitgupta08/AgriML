// Scenario Simulation Engine
// "What-if" analysis for farmers to explore different input scenarios

export class ScenarioSimulator {
    constructor(predictFn) {
        this.predict = predictFn; // Reference to main predict function
    }

    // Run a scenario: modify specific inputs and compare
    simulate(baseInput, modifications) {
        const scenarioInput = { ...baseInput, ...modifications };

        // Get base prediction
        const baseResult = this.predict(baseInput);
        // Get scenario prediction
        const scenarioResult = this.predict(scenarioInput);

        if (!baseResult || !scenarioResult) return null;

        // Calculate deltas
        const yieldDelta = scenarioResult.yieldResult.yield - baseResult.yieldResult.yield;
        const yieldPct = baseResult.yieldResult.yield > 0 ? (yieldDelta / baseResult.yieldResult.yield * 100) : 0;

        const costDelta = scenarioResult.optResult.costEstimate - baseResult.optResult.costEstimate;
        const envDelta = scenarioResult.optResult.environmentalImpact - baseResult.optResult.environmentalImpact;

        return {
            base: {
                yield: baseResult.yieldResult.yield,
                fertilizer: baseResult.fertResult.fertilizer,
                cost: baseResult.optResult.costEstimate,
                envImpact: baseResult.optResult.environmentalImpact,
                quantity: baseResult.optResult.quantityPerHectare,
                optimizationScore: baseResult.optResult.optimizationScore
            },
            scenario: {
                yield: scenarioResult.yieldResult.yield,
                fertilizer: scenarioResult.fertResult.fertilizer,
                cost: scenarioResult.optResult.costEstimate,
                envImpact: scenarioResult.optResult.environmentalImpact,
                quantity: scenarioResult.optResult.quantityPerHectare,
                optimizationScore: scenarioResult.optResult.optimizationScore
            },
            deltas: {
                yield: Math.round(yieldDelta * 100) / 100,
                yieldPercent: Math.round(yieldPct * 10) / 10,
                cost: costDelta,
                envImpact: envDelta,
                optimizationScore: scenarioResult.optResult.optimizationScore - baseResult.optResult.optimizationScore
            },
            modifications,
            recommendation: this._generateRecommendation(yieldDelta, costDelta, envDelta, modifications)
        };
    }

    // Predefined scenarios for quick analysis
    getPresetScenarios(baseInput) {
        return [
            {
                id: 'less_fertilizer',
                name: 'Reduce Fertilizer by 30%',
                icon: '📉',
                description: 'What if I use 30% less fertilizer?',
                modifications: {
                    nitrogen: Math.round(baseInput.nitrogen * 0.7),
                    phosphorus: Math.round(baseInput.phosphorus * 0.7),
                    potassium: Math.round(baseInput.potassium * 0.7)
                }
            },
            {
                id: 'more_fertilizer',
                name: 'Increase Fertilizer by 30%',
                icon: '📈',
                description: 'What if I use 30% more fertilizer?',
                modifications: {
                    nitrogen: Math.round(baseInput.nitrogen * 1.3),
                    phosphorus: Math.round(baseInput.phosphorus * 1.3),
                    potassium: Math.round(baseInput.potassium * 1.3)
                }
            },
            {
                id: 'drought',
                name: 'Drought Conditions',
                icon: '🏜️',
                description: 'What if rainfall drops to 20mm?',
                modifications: { rainfall: 20, moisture: 20 }
            },
            {
                id: 'heavy_rain',
                name: 'Heavy Rainfall',
                icon: '🌧️',
                description: 'What if rainfall increases to 350mm?',
                modifications: { rainfall: 350, moisture: 85 }
            },
            {
                id: 'heat_wave',
                name: 'Heat Wave',
                icon: '🌡️',
                description: 'What if temperature rises to 42°C?',
                modifications: { temperature: 42, humidity: 30 }
            },
            {
                id: 'optimal',
                name: 'Optimal Conditions',
                icon: '✨',
                description: 'What if all conditions are optimal?',
                modifications: {
                    nitrogen: 90, phosphorus: 50, potassium: 45,
                    pH: 6.5, moisture: 55, temperature: 25,
                    rainfall: 120, humidity: 65
                }
            }
        ];
    }

    _generateRecommendation(yieldDelta, costDelta, envDelta, modifications) {
        const parts = [];

        if (yieldDelta > 0.5) {
            parts.push(`Yield increases by ${Math.abs(Math.round(yieldDelta * 100) / 100)} t/ha — beneficial change.`);
        } else if (yieldDelta < -0.5) {
            parts.push(`Yield decreases by ${Math.abs(Math.round(yieldDelta * 100) / 100)} t/ha — consider if the trade-off is worth it.`);
        } else {
            parts.push('Minimal impact on yield.');
        }

        if (costDelta < -100) {
            parts.push(`Cost savings of ₹${Math.abs(costDelta)}.`);
        } else if (costDelta > 100) {
            parts.push(`Additional cost of ₹${costDelta}.`);
        }

        if (envDelta < -10) {
            parts.push('Environmental impact improves — more sustainable.');
        } else if (envDelta > 10) {
            parts.push('Environmental impact worsens — less sustainable.');
        }

        return parts.join(' ');
    }
}
