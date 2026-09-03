// Sustainability Score Module
// Generates sustainability index based on fertilizer usage, soil health, and environmental impact

import { CROP_PROFILES } from './dataset.js';

export function computeSustainabilityScore(input, optResult, soilDegradation) {
    const scores = {};

    // 1. Fertilizer Efficiency Score (0-100)
    const fertEfficiency = Math.max(0, 100 - (optResult.quantityPerHectare / 5));
    scores.fertilizerEfficiency = Math.round(Math.min(100, fertEfficiency));

    // 2. Soil Balance Score (0-100)
    const deficits = optResult.nutrientDeficits;
    const totalDeficit = deficits.nitrogen + deficits.phosphorus + deficits.potassium;
    scores.soilBalance = Math.round(Math.max(0, 100 - totalDeficit));

    // 3. Environmental Impact Score (inverse — higher is better)
    scores.environmentalScore = 100 - optResult.environmentalImpact;

    // 4. Water Impact Score
    const waterRisk = (input.rainfall > 200 ? 30 : 0) + (input.moisture > 80 ? 20 : 0) + (optResult.quantityPerHectare > 200 ? 20 : 0);
    scores.waterImpact = Math.round(Math.max(0, 100 - waterRisk));

    // 5. Soil Health Trend Score
    if (soilDegradation && soilDegradation.overallHealth) {
        scores.soilHealthTrend = soilDegradation.overallHealth;
    } else {
        // Base on current pH and moisture
        const phScore = input.pH >= 5.5 && input.pH <= 7.5 ? 80 : input.pH >= 4.5 && input.pH <= 8.5 ? 50 : 20;
        const moistScore = input.moisture >= 30 && input.moisture <= 70 ? 80 : 40;
        scores.soilHealthTrend = Math.round((phScore + moistScore) / 2);
    }

    // 6. Carbon Footprint Score (simplified)
    const carbonFromFert = optResult.quantityPerHectare * 0.5; // kg CO2 per kg fertilizer
    scores.carbonFootprint = Math.round(Math.max(0, 100 - (carbonFromFert / 2.5)));

    // Overall Sustainability Index (weighted)
    const weights = {
        fertilizerEfficiency: 0.2,
        soilBalance: 0.15,
        environmentalScore: 0.2,
        waterImpact: 0.15,
        soilHealthTrend: 0.15,
        carbonFootprint: 0.15
    };

    const overallScore = Math.round(
        Object.entries(weights).reduce((sum, [key, weight]) => sum + (scores[key] || 50) * weight, 0)
    );

    // Generate eco-friendly recommendations
    const ecoRecommendations = generateEcoRecommendations(input, optResult, scores);

    // Sustainability grade
    const grade = overallScore >= 80 ? 'A' :
        overallScore >= 65 ? 'B' :
            overallScore >= 50 ? 'C' :
                overallScore >= 35 ? 'D' : 'F';

    return {
        overallScore,
        grade,
        gradeLabel: grade === 'A' ? 'Excellent' : grade === 'B' ? 'Good' : grade === 'C' ? 'Fair' : grade === 'D' ? 'Poor' : 'Critical',
        components: scores,
        ecoRecommendations,
        badges: generateBadges(scores)
    };
}

function generateEcoRecommendations(input, optResult, scores) {
    const recs = [];

    if (scores.fertilizerEfficiency < 60) {
        recs.push({ icon: '🌿', text: 'Consider organic fertilizers or compost to reduce chemical dependency.' });
    }
    if (scores.waterImpact < 60) {
        recs.push({ icon: '💧', text: 'Use drip irrigation to minimize nutrient runoff into water bodies.' });
    }
    if (scores.carbonFootprint < 50) {
        recs.push({ icon: '🌍', text: 'Split fertilizer application into 2-3 doses to reduce CO₂ emissions.' });
    }
    if (scores.soilBalance < 50) {
        recs.push({ icon: '🔄', text: 'Practice crop rotation to naturally restore soil nutrients.' });
    }
    if (input.pH < 5.5) {
        recs.push({ icon: '⚗️', text: 'Apply agricultural lime to gradually raise soil pH naturally.' });
    }
    if (optResult.quantityPerHectare > 200) {
        recs.push({ icon: '📉', text: 'Reduce fertilizer quantity — consider precision agriculture techniques.' });
    }
    recs.push({ icon: '🌱', text: 'Consider cover cropping during off-season to prevent soil erosion.' });

    return recs;
}

function generateBadges(scores) {
    const badges = [];
    if (scores.fertilizerEfficiency >= 80) badges.push({ icon: '🏆', label: 'Efficient Fertilizer Use' });
    if (scores.environmentalScore >= 80) badges.push({ icon: '🌿', label: 'Low Environmental Impact' });
    if (scores.waterImpact >= 80) badges.push({ icon: '💧', label: 'Water-Friendly Farming' });
    if (scores.carbonFootprint >= 80) badges.push({ icon: '🌍', label: 'Low Carbon Footprint' });
    if (scores.soilHealthTrend >= 80) badges.push({ icon: '🌾', label: 'Healthy Soil' });
    return badges;
}
