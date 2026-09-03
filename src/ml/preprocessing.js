// Data Preprocessing Module
// Handles imputation, normalization, encoding, and feature selection

const NUMERIC_FEATURES = ['nitrogen', 'phosphorus', 'potassium', 'pH', 'moisture', 'temperature', 'rainfall', 'humidity'];

export function imputeMissing(data) {
    const result = data.map(d => ({ ...d }));

    // Mean imputation for numeric
    for (const feat of NUMERIC_FEATURES) {
        const values = result.filter(d => d[feat] != null && !isNaN(d[feat])).map(d => d[feat]);
        const mean = values.reduce((s, v) => s + v, 0) / values.length;
        for (const d of result) {
            if (d[feat] == null || isNaN(d[feat])) d[feat] = mean;
        }
    }

    // Mode imputation for crop
    const cropCounts = {};
    result.forEach(d => { if (d.crop) cropCounts[d.crop] = (cropCounts[d.crop] || 0) + 1; });
    const modeCrop = Object.entries(cropCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Rice';
    result.forEach(d => { if (!d.crop) d.crop = modeCrop; });

    return result;
}

export function computeNormParams(data) {
    const params = {};
    for (const feat of NUMERIC_FEATURES) {
        const values = data.map(d => d[feat]);
        const min = Math.min(...values);
        const max = Math.max(...values);
        params[feat] = { min, max, range: max - min || 1 };
    }
    return params;
}

export function normalize(data, params) {
    return data.map(d => {
        const normed = { ...d };
        for (const feat of NUMERIC_FEATURES) {
            normed[feat] = (d[feat] - params[feat].min) / params[feat].range;
        }
        return normed;
    });
}

export function denormalize(value, feat, params) {
    return value * params[feat].range + params[feat].min;
}

export function normalizeSingle(input, params) {
    const normed = { ...input };
    for (const feat of NUMERIC_FEATURES) {
        if (normed[feat] !== undefined) {
            normed[feat] = (input[feat] - params[feat].min) / params[feat].range;
        }
    }
    return normed;
}

export function oneHotEncode(data, cropTypes) {
    return data.map(d => {
        const encoded = { ...d };
        for (const ct of cropTypes) {
            encoded[`crop_${ct}`] = d.crop === ct ? 1 : 0;
        }
        return encoded;
    });
}

export function extractFeatures(d, cropTypes) {
    const features = NUMERIC_FEATURES.map(f => d[f] ?? 0);
    for (const ct of cropTypes) {
        features.push(d[`crop_${ct}`] ?? (d.crop === ct ? 1 : 0));
    }
    return features;
}

export function computeFeatureImportance(data, target, cropTypes) {
    // Variance-based feature importance (simplified)
    const featureNames = [...NUMERIC_FEATURES, ...cropTypes.map(c => `crop_${c}`)];
    const targetValues = data.map(d => d[target]);
    const targetMean = targetValues.reduce((s, v) => s + v, 0) / targetValues.length;

    const importance = {};
    for (const feat of featureNames) {
        const values = data.map(d => {
            if (feat.startsWith('crop_')) return d[feat] ?? 0;
            return d[feat] ?? 0;
        });
        // Correlation-based importance
        const featMean = values.reduce((s, v) => s + v, 0) / values.length;
        let cov = 0, varF = 0, varT = 0;
        for (let i = 0; i < values.length; i++) {
            const df = values[i] - featMean;
            const dt = targetValues[i] - targetMean;
            cov += df * dt;
            varF += df * df;
            varT += dt * dt;
        }
        const corr = (varF > 0 && varT > 0) ? cov / Math.sqrt(varF * varT) : 0;
        importance[feat] = Math.abs(corr);
    }

    // Normalize to sum to 1
    const total = Object.values(importance).reduce((s, v) => s + v, 0) || 1;
    for (const key of Object.keys(importance)) {
        importance[key] = importance[key] / total;
    }
    return importance;
}

export { NUMERIC_FEATURES };
