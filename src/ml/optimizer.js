// Optimization Layer
// Rule-based + ML blended optimization for fertilizer quantity and environmental impact

import { CROP_PROFILES } from './dataset.js';

const FERTILIZER_NUTRIENT_CONTENT = {
    'Urea': { N: 46, P: 0, K: 0, costPerKg: 8 },
    'DAP': { N: 18, P: 46, K: 0, costPerKg: 28 },
    'NPK 10-26-26': { N: 10, P: 26, K: 26, costPerKg: 22 },
    'NPK 20-20-20': { N: 20, P: 20, K: 20, costPerKg: 25 },
    'MOP': { N: 0, P: 0, K: 60, costPerKg: 18 },
    'SSP': { N: 0, P: 16, K: 0, costPerKg: 10 },
    'Ammonium Sulphate': { N: 21, P: 0, K: 0, costPerKg: 12 }
};

export function optimizeFertilizer(input, fertilizerType, predictedYield) {
    const crop = input.crop;
    const profile = CROP_PROFILES[crop];
    if (!profile) return defaultRecommendation(fertilizerType, predictedYield);

    const fertInfo = FERTILIZER_NUTRIENT_CONTENT[fertilizerType] || FERTILIZER_NUTRIENT_CONTENT['NPK 20-20-20'];

    // Calculate nutrient deficits
    const nOptimal = (profile.nRange[0] + profile.nRange[1]) / 2;
    const pOptimal = (profile.pRange[0] + profile.pRange[1]) / 2;
    const kOptimal = (profile.kRange[0] + profile.kRange[1]) / 2;

    const nDeficit = Math.max(0, nOptimal - (input.nitrogen || 0));
    const pDeficit = Math.max(0, pOptimal - (input.phosphorus || 0));
    const kDeficit = Math.max(0, kOptimal - (input.potassium || 0));

    // Calculate required fertilizer quantity (kg/hectare)
    let quantity = 0;
    if (fertInfo.N > 0) quantity = Math.max(quantity, (nDeficit / fertInfo.N) * 100);
    if (fertInfo.P > 0) quantity = Math.max(quantity, (pDeficit / fertInfo.P) * 100);
    if (fertInfo.K > 0) quantity = Math.max(quantity, (kDeficit / fertInfo.K) * 100);

    // Cap at reasonable max (500 kg/hectare)
    quantity = Math.min(500, Math.max(20, Math.round(quantity)));

    // Land area adjustment
    const area = input.landArea || 1;
    const totalQuantity = quantity * area;

    // Environmental impact score (0-100, lower is better)
    const overApplication = (nDeficit + pDeficit + kDeficit) < 30 ? 15 : 0;
    const highRainRisk = (input.rainfall > 200) ? 20 : 0;
    const acidification = (input.pH < 5.5 && fertInfo.N > 30) ? 15 : 0;
    const waterRisk = (input.moisture > 80) ? 10 : 0;
    const quantityImpact = Math.min(40, quantity / 12.5);

    const envImpact = Math.round(Math.min(100, overApplication + highRainRisk + acidification + waterRisk + quantityImpact));

    // Cost estimate
    const costEstimate = Math.round(totalQuantity * fertInfo.costPerKg);

    // Optimization score (composite)
    const yieldScore = Math.min(100, (predictedYield / ((profile.yieldRange[1] + profile.yieldRange[0]) / 2)) * 50);
    const costScore = Math.max(0, 100 - (costEstimate / 50));
    const envScore = 100 - envImpact;
    const optimizationScore = Math.round(0.4 * yieldScore + 0.3 * envScore + 0.3 * costScore);

    // Generate alerts
    const alerts = [];
    if (input.pH < 4.5) alerts.push({ level: 'critical', message: 'Soil pH is critically low (acidic). Consider lime application before fertilizing.' });
    else if (input.pH < 5.5) alerts.push({ level: 'warning', message: 'Soil pH is low. Acidic soil may reduce nutrient uptake.' });
    if (input.pH > 8.5) alerts.push({ level: 'warning', message: 'Soil pH is high (alkaline). Consider gypsum or sulfur application.' });
    if (input.moisture < 20) alerts.push({ level: 'critical', message: 'Soil moisture is critically low. Irrigation needed before fertilizer application.' });
    if (input.moisture > 85) alerts.push({ level: 'warning', message: 'Soil moisture is very high. Delay fertilizer application to prevent runoff.' });
    if (input.nitrogen < 20) alerts.push({ level: 'warning', message: 'Nitrogen level is very low. Crop may show yellowing leaves.' });
    if (input.temperature > 40) alerts.push({ level: 'warning', message: 'Temperature is very high. Apply fertilizer early morning or evening.' });
    if (input.rainfall > 250) alerts.push({ level: 'warning', message: 'Heavy rainfall expected. Risk of fertilizer leaching.' });
    if (nDeficit < 10 && pDeficit < 10 && kDeficit < 10) alerts.push({ level: 'info', message: 'Soil nutrient levels are near optimal. Minimal fertilization needed.' });

    return {
        fertilizerType,
        quantityPerHectare: quantity,
        totalQuantity: Math.round(totalQuantity),
        landArea: area,
        costEstimate,
        costPerHectare: Math.round(quantity * fertInfo.costPerKg),
        environmentalImpact: envImpact,
        optimizationScore: Math.min(100, Math.max(0, optimizationScore)),
        nutrientDeficits: {
            nitrogen: Math.round(nDeficit),
            phosphorus: Math.round(pDeficit),
            potassium: Math.round(kDeficit)
        },
        alerts,
        unit: 'kg'
    };
}

function defaultRecommendation(fertilizerType, predictedYield) {
    return {
        fertilizerType,
        quantityPerHectare: 150,
        totalQuantity: 150,
        landArea: 1,
        costEstimate: 3000,
        costPerHectare: 3000,
        environmentalImpact: 50,
        optimizationScore: 50,
        nutrientDeficits: { nitrogen: 30, phosphorus: 20, potassium: 20 },
        alerts: [],
        unit: 'kg'
    };
}

export function generateExplanation(input, fertResult, yieldResult, optResult, featureImportance) {
    const parts = [];

    // Main recommendation reason
    const topFeatures = Object.entries(featureImportance || {})
        .filter(([k]) => !k.startsWith('crop_'))
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    const featureLabels = {
        nitrogen: 'nitrogen level', phosphorus: 'phosphorus level', potassium: 'potassium level',
        pH: 'soil pH', moisture: 'soil moisture', temperature: 'temperature',
        rainfall: 'rainfall', humidity: 'humidity'
    };

    if (topFeatures.length > 0) {
        const topNames = topFeatures.map(([k]) => featureLabels[k] || k).join(', ');
        parts.push(`Recommendation based on ${topNames} and ${input.crop} crop requirements.`);
    }

    // Nutrient-specific
    if (input.nitrogen < 50) parts.push(`Low nitrogen (${input.nitrogen} kg/ha) — nitrogen-rich fertilizer recommended.`);
    if (input.phosphorus < 35) parts.push(`Low phosphorus (${input.phosphorus} kg/ha) — phosphorus supplementation suggested.`);
    if (input.potassium < 30) parts.push(`Low potassium (${input.potassium} kg/ha) — potassium boost recommended.`);

    // Environmental notes
    if (input.rainfall > 200) parts.push(`High rainfall may cause nutrient leaching — consider split application.`);
    if (input.temperature > 35) parts.push(`High temperature — apply in cooler hours for better absorption.`);

    // Yield context
    const profile = CROP_PROFILES[input.crop];
    if (profile) {
        const midYield = (profile.yieldRange[0] + profile.yieldRange[1]) / 2;
        if (yieldResult.yield > midYield) {
            parts.push(`Predicted yield is above average for ${input.crop} — conditions are favorable.`);
        } else {
            parts.push(`Predicted yield is below average for ${input.crop} — consider optimizing inputs.`);
        }
    }

    return parts;
}

export { FERTILIZER_NUTRIENT_CONTENT };
