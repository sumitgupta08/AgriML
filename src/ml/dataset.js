// Synthetic Agricultural Dataset Generator
// Generates realistic agronomic data for training fertilizer & yield models

const CROP_TYPES = [
  'Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane',
  'Soybean', 'Potato', 'Tomato', 'Groundnut', 'Barley'
];

const FERTILIZER_TYPES = ['Urea', 'DAP', 'NPK 10-26-26', 'NPK 20-20-20', 'MOP', 'SSP', 'Ammonium Sulphate'];

// Crop-specific optimal ranges
const CROP_PROFILES = {
  Rice:       { nRange: [60, 120], pRange: [30, 60], kRange: [30, 60], phRange: [5.5, 7.0], moistRange: [60, 90], tempRange: [22, 35], rainRange: [150, 300], humRange: [60, 90], yieldRange: [3.0, 8.0] },
  Wheat:      { nRange: [80, 140], pRange: [40, 70], kRange: [20, 50], phRange: [6.0, 7.5], moistRange: [40, 65], tempRange: [12, 25], rainRange: [50, 150], humRange: [40, 70], yieldRange: [2.5, 6.5] },
  Maize:      { nRange: [80, 160], pRange: [30, 60], kRange: [20, 50], phRange: [5.8, 7.0], moistRange: [45, 70], tempRange: [18, 32], rainRange: [80, 200], humRange: [50, 80], yieldRange: [3.0, 9.0] },
  Cotton:     { nRange: [60, 120], pRange: [20, 50], kRange: [20, 40], phRange: [6.0, 7.5], moistRange: [35, 60], tempRange: [20, 35], rainRange: [60, 150], humRange: [40, 70], yieldRange: [1.5, 4.0] },
  Sugarcane:  { nRange: [100, 200], pRange: [40, 80], kRange: [40, 80], phRange: [5.5, 7.5], moistRange: [55, 85], tempRange: [22, 36], rainRange: [100, 250], humRange: [55, 85], yieldRange: [50, 120] },
  Soybean:    { nRange: [20, 50], pRange: [40, 70], kRange: [20, 50], phRange: [6.0, 7.0], moistRange: [40, 65], tempRange: [20, 30], rainRange: [60, 150], humRange: [50, 75], yieldRange: [1.5, 4.0] },
  Potato:     { nRange: [80, 150], pRange: [50, 90], kRange: [60, 100], phRange: [5.0, 6.5], moistRange: [50, 75], tempRange: [15, 25], rainRange: [50, 120], humRange: [55, 80], yieldRange: [15, 40] },
  Tomato:     { nRange: [60, 130], pRange: [40, 80], kRange: [50, 90], phRange: [5.5, 7.0], moistRange: [45, 70], tempRange: [18, 30], rainRange: [40, 100], humRange: [50, 75], yieldRange: [20, 60] },
  Groundnut:  { nRange: [10, 30], pRange: [30, 60], kRange: [20, 40], phRange: [5.5, 7.0], moistRange: [35, 55], tempRange: [22, 33], rainRange: [50, 130], humRange: [40, 65], yieldRange: [1.0, 3.5] },
  Barley:     { nRange: [60, 110], pRange: [30, 55], kRange: [20, 45], phRange: [6.0, 8.0], moistRange: [35, 55], tempRange: [10, 22], rainRange: [40, 120], humRange: [35, 65], yieldRange: [2.0, 5.5] }
};

function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function randInRange(rng, min, max) {
  return min + rng() * (max - min);
}

function determineFertilizer(n, p, k, pH, crop) {
  // Rule-based fertilizer assignment with realistic agronomic logic
  const nLow = n < 50;
  const pLow = p < 35;
  const kLow = k < 30;
  const acidic = pH < 5.5;

  if (nLow && pLow && kLow) return 'NPK 20-20-20';
  if (nLow && pLow) return 'DAP';
  if (nLow && !pLow && !kLow) return 'Urea';
  if (pLow && kLow) return 'NPK 10-26-26';
  if (kLow) return 'MOP';
  if (pLow) return 'SSP';
  if (acidic) return 'Ammonium Sulphate';

  // High nutrient levels — balanced NPK
  return 'NPK 20-20-20';
}

function computeYield(n, p, k, pH, moisture, temp, rainfall, humidity, profile) {
  const [yMin, yMax] = profile.yieldRange;
  const midY = (yMin + yMax) / 2;
  const range = yMax - yMin;

  // Normalized factor: how close each param is to its optimal midpoint
  const nOpt = (profile.nRange[0] + profile.nRange[1]) / 2;
  const pOpt = (profile.pRange[0] + profile.pRange[1]) / 2;
  const kOpt = (profile.kRange[0] + profile.kRange[1]) / 2;
  const phOpt = (profile.phRange[0] + profile.phRange[1]) / 2;
  const mOpt = (profile.moistRange[0] + profile.moistRange[1]) / 2;
  const tOpt = (profile.tempRange[0] + profile.tempRange[1]) / 2;
  const rOpt = (profile.rainRange[0] + profile.rainRange[1]) / 2;
  const hOpt = (profile.humRange[0] + profile.humRange[1]) / 2;

  const nSpread = (profile.nRange[1] - profile.nRange[0]) / 2 || 1;
  const pSpread = (profile.pRange[1] - profile.pRange[0]) / 2 || 1;
  const kSpread = (profile.kRange[1] - profile.kRange[0]) / 2 || 1;

  const nScore = 1 - Math.min(Math.abs(n - nOpt) / (nSpread * 2), 1);
  const pScore = 1 - Math.min(Math.abs(p - pOpt) / (pSpread * 2), 1);
  const kScore = 1 - Math.min(Math.abs(k - kOpt) / (kSpread * 2), 1);
  const phScore = 1 - Math.min(Math.abs(pH - phOpt) / 3, 1);
  const mScore = 1 - Math.min(Math.abs(moisture - mOpt) / 50, 1);
  const tScore = 1 - Math.min(Math.abs(temp - tOpt) / 20, 1);
  const rScore = 1 - Math.min(Math.abs(rainfall - rOpt) / 200, 1);
  const hScore = 1 - Math.min(Math.abs(humidity - hOpt) / 40, 1);

  const composite = 0.2 * nScore + 0.15 * pScore + 0.15 * kScore +
    0.1 * phScore + 0.1 * mScore + 0.1 * tScore + 0.1 * rScore + 0.1 * hScore;

  return yMin + composite * range;
}

export function generateDataset(numSamples = 2000, seed = 42) {
  const rng = seededRandom(seed);
  const samples = [];

  for (let i = 0; i < numSamples; i++) {
    const cropIdx = Math.floor(rng() * CROP_TYPES.length);
    const crop = CROP_TYPES[cropIdx];
    const profile = CROP_PROFILES[crop];

    // Generate with some noise outside optimal range
    const spread = rng() < 0.3 ? 1.5 : 1.0; // 30% chance of out-of-range values
    const n = Math.max(0, randInRange(rng, profile.nRange[0] / spread, profile.nRange[1] * spread));
    const p = Math.max(0, randInRange(rng, profile.pRange[0] / spread, profile.pRange[1] * spread));
    const k = Math.max(0, randInRange(rng, profile.kRange[0] / spread, profile.kRange[1] * spread));
    const pH = Math.max(3, Math.min(10, randInRange(rng, profile.phRange[0] - 1, profile.phRange[1] + 1)));
    const moisture = Math.max(5, Math.min(100, randInRange(rng, profile.moistRange[0] - 15, profile.moistRange[1] + 15)));
    const temp = Math.max(-5, Math.min(50, randInRange(rng, profile.tempRange[0] - 5, profile.tempRange[1] + 5)));
    const rainfall = Math.max(0, randInRange(rng, profile.rainRange[0] * 0.3, profile.rainRange[1] * 1.5));
    const humidity = Math.max(10, Math.min(100, randInRange(rng, profile.humRange[0] - 10, profile.humRange[1] + 10)));

    const fertilizer = determineFertilizer(n, p, k, pH, crop);
    const yieldValue = computeYield(n, p, k, pH, moisture, temp, rainfall, humidity, profile);
    const noisyYield = Math.max(0, yieldValue + (rng() - 0.5) * yieldValue * 0.15);

    samples.push({
      nitrogen: Math.round(n * 10) / 10,
      phosphorus: Math.round(p * 10) / 10,
      potassium: Math.round(k * 10) / 10,
      pH: Math.round(pH * 100) / 100,
      moisture: Math.round(moisture * 10) / 10,
      temperature: Math.round(temp * 10) / 10,
      rainfall: Math.round(rainfall * 10) / 10,
      humidity: Math.round(humidity * 10) / 10,
      crop,
      fertilizer,
      yield: Math.round(noisyYield * 100) / 100
    });
  }

  return samples;
}

export { CROP_TYPES, FERTILIZER_TYPES, CROP_PROFILES };
