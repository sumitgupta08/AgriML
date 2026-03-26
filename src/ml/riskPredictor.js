// Risk Prediction Module
// Predicts agricultural risks: over-fertilization, nutrient imbalance, low yield, environmental

import { CROP_PROFILES } from './dataset.js';

export function predictRisks(input, yieldResult, optResult) {
    const risks = [];
    const crop = input.crop;
    const profile = CROP_PROFILES[crop];

    if (!profile) return { risks: [], overallRiskLevel: 'unknown', riskScore: 50 };

    // 1. Over-fertilization Risk
    const nExcess = input.nitrogen - profile.nRange[1];
    const pExcess = input.phosphorus - profile.pRange[1];
    const kExcess = input.potassium - profile.kRange[1];

    if (nExcess > 20 || pExcess > 20 || kExcess > 20) {
        const excessNutrients = [];
        if (nExcess > 20) excessNutrients.push(`Nitrogen (+${Math.round(nExcess)} kg/ha)`);
        if (pExcess > 20) excessNutrients.push(`Phosphorus (+${Math.round(pExcess)} kg/ha)`);
        if (kExcess > 20) excessNutrients.push(`Potassium (+${Math.round(kExcess)} kg/ha)`);
        risks.push({
            id: 'over_fert',
            category: 'Over-Fertilization',
            severity: nExcess > 40 || pExcess > 40 ? 'high' : 'medium',
            probability: Math.min(95, 50 + Math.max(nExcess, pExcess, kExcess)),
            description: `Excess nutrient levels detected: ${excessNutrients.join(', ')}. Risk of nutrient burn and groundwater contamination.`,
            recommendation: 'Reduce fertilizer application. Consider soil testing before next application.',
            icon: '⚠️'
        });
    }

    // 2. Nutrient Imbalance Risk
    const nRatio = input.nitrogen / (profile.nRange[0] + profile.nRange[1]) * 2;
    const pRatio = input.phosphorus / (profile.pRange[0] + profile.pRange[1]) * 2;
    const kRatio = input.potassium / (profile.kRange[0] + profile.kRange[1]) * 2;
    const maxRatio = Math.max(nRatio, pRatio, kRatio);
    const minRatio = Math.min(nRatio, pRatio, kRatio);
    const imbalance = maxRatio - minRatio;

    if (imbalance > 0.6) {
        risks.push({
            id: 'nutrient_imbalance',
            category: 'Nutrient Imbalance',
            severity: imbalance > 1.0 ? 'high' : 'medium',
            probability: Math.min(90, Math.round(imbalance * 60)),
            description: `N:P:K ratio is significantly imbalanced (${nRatio.toFixed(1)}:${pRatio.toFixed(1)}:${kRatio.toFixed(1)}). This can lock out nutrient uptake.`,
            recommendation: 'Apply balanced NPK fertilizer to correct the ratio before crop-specific supplementation.',
            icon: '⚖️'
        });
    }

    // 3. Low Yield Risk
    const midYield = (profile.yieldRange[0] + profile.yieldRange[1]) / 2;
    if (yieldResult.yield < midYield * 0.6) {
        risks.push({
            id: 'low_yield',
            category: 'Low Yield',
            severity: yieldResult.yield < midYield * 0.4 ? 'high' : 'medium',
            probability: Math.round(Math.max(40, 100 - yieldResult.confidence * 100)),
            description: `Predicted yield (${yieldResult.yield} t/ha) is significantly below average for ${crop} (${midYield.toFixed(1)} t/ha).`,
            recommendation: 'Review soil conditions, ensure adequate irrigation, and consider soil amendments.',
            icon: '📉'
        });
    }

    // 4. pH Stress Risk
    if (input.pH < profile.phRange[0] - 1 || input.pH > profile.phRange[1] + 1) {
        risks.push({
            id: 'ph_stress',
            category: 'pH Stress',
            severity: input.pH < 4.0 || input.pH > 9.0 ? 'high' : 'medium',
            probability: 75,
            description: `Soil pH (${input.pH}) is outside the optimal range (${profile.phRange[0]}-${profile.phRange[1]}) for ${crop}.`,
            recommendation: input.pH < 5.5 ? 'Apply agricultural lime to raise pH.' : 'Apply sulfur or gypsum to lower pH.',
            icon: '🧪'
        });
    }

    // 5. Drought Risk
    if (input.moisture < 25 && input.rainfall < 30) {
        risks.push({
            id: 'drought',
            category: 'Drought Stress',
            severity: input.moisture < 15 ? 'high' : 'medium',
            probability: Math.round(90 - input.moisture),
            description: `Low soil moisture (${input.moisture}%) combined with low rainfall (${input.rainfall}mm). Crop water stress likely.`,
            recommendation: 'Prioritize irrigation. Consider mulching to retain soil moisture.',
            icon: '🏜️'
        });
    }

    // 6. Leaching Risk
    if (input.rainfall > 200 && optResult.quantityPerHectare > 100) {
        risks.push({
            id: 'leaching',
            category: 'Nutrient Leaching',
            severity: input.rainfall > 300 ? 'high' : 'medium',
            probability: Math.min(85, 40 + (input.rainfall - 200) / 3),
            description: `High rainfall (${input.rainfall}mm) with significant fertilizer application may cause nutrients to leach below root zone.`,
            recommendation: 'Use slow-release fertilizers or split application into multiple doses.',
            icon: '🌊'
        });
    }

    // 7. Temperature Stress
    if (input.temperature < profile.tempRange[0] - 5 || input.temperature > profile.tempRange[1] + 5) {
        risks.push({
            id: 'temp_stress',
            category: 'Temperature Stress',
            severity: 'medium',
            probability: 60,
            description: `Temperature (${input.temperature}°C) is far outside the optimal range (${profile.tempRange[0]}-${profile.tempRange[1]}°C) for ${crop}.`,
            recommendation: input.temperature > 35 ? 'Provide shade or irrigation cooling.' : 'Consider row covers for frost protection.',
            icon: '🌡️'
        });
    }

    // Calculate overall risk
    const riskScore = risks.length > 0
        ? Math.round(risks.reduce((s, r) => s + (r.severity === 'high' ? 30 : r.severity === 'medium' ? 15 : 5), 0) / risks.length * (Math.min(risks.length, 5) / 2))
        : 5;

    const overallRiskLevel = riskScore > 60 ? 'high' : riskScore > 30 ? 'medium' : 'low';

    return {
        risks: risks.sort((a, b) => {
            const sevOrder = { high: 0, medium: 1, low: 2 };
            return (sevOrder[a.severity] || 2) - (sevOrder[b.severity] || 2);
        }),
        overallRiskLevel,
        riskScore: Math.min(100, riskScore),
        riskCount: { high: risks.filter(r => r.severity === 'high').length, medium: risks.filter(r => r.severity === 'medium').length, low: risks.filter(r => r.severity === 'low').length }
    };
}
