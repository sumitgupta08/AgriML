// Main Entry Point — AgriML System v2
// Full integration: ML models + Advanced features + Auth

import './styles/index.css';
import { generateDataset, CROP_TYPES, FERTILIZER_TYPES } from './ml/dataset.js';
import { imputeMissing, computeNormParams, normalize, normalizeSingle, oneHotEncode, computeFeatureImportance } from './ml/preprocessing.js';
import { RandomForestClassifier } from './ml/fertilizerModel.js';
import { GradientBoostingRegressor } from './ml/yieldModel.js';
import { optimizeFertilizer, generateExplanation } from './ml/optimizer.js';
import { SoilHealthTracker } from './ml/soilHealth.js';
import { AdaptiveLearningSystem } from './ml/adaptiveLearning.js';
import { ClimateEngine } from './ml/climateEngine.js';
import { computeSustainabilityScore } from './ml/sustainability.js';
import { predictRisks } from './ml/riskPredictor.js';
import { ScenarioSimulator } from './ml/scenarioSimulator.js';
import { FeedbackLoop } from './ml/feedbackLoop.js';
import { renderDashboard, updateResults, showTrainingOverlay, hideTrainingOverlay } from './ui/Dashboard.js';
import { initCharts, updateCharts } from './ui/Charts.js';
import { isLoggedIn, renderAuthPage, getCurrentUser, logout } from './ui/Auth.js';

// Global state
const state = {
  fertModel: null,
  yieldModel: null,
  normParams: null,
  featureImportance: null,
  trained: false,
  history: [],
  // Advanced modules
  soilTracker: new SoilHealthTracker(),
  adaptiveLearning: new AdaptiveLearningSystem(),
  climateEngine: new ClimateEngine(),
  feedbackLoop: new FeedbackLoop(),
  scenarioSimulator: null, // initialized after training
  lastInput: null,
  lastResult: null
};

async function trainModels() {
  showTrainingOverlay();
  await new Promise(r => setTimeout(r, 100));

  const rawData = generateDataset(2000, 42);
  const imputed = imputeMissing(rawData);
  state.normParams = computeNormParams(imputed);
  const normed = normalize(imputed, state.normParams);
  const encoded = oneHotEncode(normed, CROP_TYPES);
  state.featureImportance = computeFeatureImportance(encoded, 'yield', CROP_TYPES);

  state.fertModel = new RandomForestClassifier(15, 12, 3);
  state.fertModel.train(encoded, CROP_TYPES);

  state.yieldModel = new GradientBoostingRegressor(50, 0.1, 4);
  state.yieldModel.train(encoded, CROP_TYPES);

  state.trained = true;

  // Initialize scenario simulator with predict function reference
  state.scenarioSimulator = new ScenarioSimulator(predict);

  await new Promise(r => setTimeout(r, 300));
  hideTrainingOverlay();
}

function predict(input) {
  if (!state.trained) return null;

  const imputed = imputeMissing([input])[0];
  const normed = normalizeSingle(imputed, state.normParams);
  const encoded = oneHotEncode([normed], CROP_TYPES)[0];

  // Core predictions
  const fertResult = state.fertModel.predict(encoded);
  const yieldResult = state.yieldModel.predict(encoded);

  // Adaptive learning: adjust yield based on historical correction
  yieldResult.yield = Math.round(
    state.adaptiveLearning.adjustPrediction(imputed.crop, yieldResult.yield) * 100
  ) / 100;

  // Optimize
  const optResult = optimizeFertilizer(imputed, fertResult.fertilizer, yieldResult.yield);

  // Climate-aware adjustments
  const climateImpact = state.climateEngine.analyzeClimateImpact(imputed);
  optResult.quantityPerHectare = Math.round(optResult.quantityPerHectare * climateImpact.quantityMultiplier);
  optResult.totalQuantity = Math.round(optResult.quantityPerHectare * (imputed.landArea || 1));

  // Soil health tracking
  state.soilTracker.record(imputed);
  const soilDegradation = state.soilTracker.predictDegradation(6);

  // Sustainability
  const sustainability = computeSustainabilityScore(imputed, optResult, soilDegradation);

  // Risk prediction
  const risks = predictRisks(imputed, yieldResult, optResult);

  // Explanations
  const explanations = generateExplanation(imputed, fertResult, yieldResult, optResult, state.featureImportance);

  // Record recommendation for adaptive learning
  state.adaptiveLearning.recordRecommendation(imputed, fertResult, yieldResult, optResult);

  // Store
  state.history.push({
    timestamp: Date.now(), input: imputed,
    fertResult, yieldResult, optResult, explanations
  });

  state.lastInput = imputed;
  state.lastResult = {
    fertResult, yieldResult, optResult, explanations,
    featureImportance: state.featureImportance,
    climateImpact, soilDegradation, sustainability, risks
  };

  return state.lastResult;
}

function handleScenario(scenarioId) {
  if (!state.lastInput || !state.scenarioSimulator) return null;
  const presets = state.scenarioSimulator.getPresetScenarios(state.lastInput);
  const preset = presets.find(p => p.id === scenarioId);
  if (!preset) return null;
  return state.scenarioSimulator.simulate(state.lastInput, preset.modifications);
}

function handleCustomScenario(modifications) {
  if (!state.lastInput || !state.scenarioSimulator) return null;
  return state.scenarioSimulator.simulate(state.lastInput, modifications);
}

function handleFeedback(feedbackData) {
  // Submit to feedback loop
  const entry = state.feedbackLoop.submit(feedbackData);
  // Also feed to adaptive learning
  state.adaptiveLearning.recordFeedback(
    feedbackData.actualYield,
    feedbackData.actualFertilizerUsed || feedbackData.recommendedFertilizer,
    feedbackData.crop,
    feedbackData.satisfaction
  );
  return entry;
}

// Initialize dashboard (after auth)
function initDashboard() {
  const app = document.getElementById('app');
  const user = getCurrentUser();

  renderDashboard(app, CROP_TYPES, {
    onAnalyze: (formData) => {
      const result = predict(formData);
      if (result) {
        updateResults(result, state);
        updateCharts(result, formData);
      }
    },
    onScenario: handleScenario,
    onCustomScenario: handleCustomScenario,
    onFeedback: handleFeedback,
    getState: () => state,
    user,
    onLogout: logout
  });

  initCharts();

  trainModels().catch(err => {
    console.error('Training failed:', err);
    hideTrainingOverlay();
  });
}

// Main entry — check auth first
function init() {
  const app = document.getElementById('app');

  if (isLoggedIn()) {
    initDashboard();
  } else {
    renderAuthPage(app, () => {
      // On successful login/signup, transition to dashboard
      setTimeout(() => initDashboard(), 100);
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
