// Main Entry Point — AgriML System v2
// Full integration: ML models + Advanced features + Auth + AI Decision Agent

import './styles/index.css';
import { generateDataset, CROP_TYPES, FERTILIZER_TYPES } from './ml/dataset.js';
import {
  imputeMissing,
  computeNormParams,
  normalize,
  normalizeSingle,
  oneHotEncode,
  computeFeatureImportance
} from './ml/preprocessing.js';
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
import { renderLandingPage } from './ui/LandingPage.js';

// Relative API Base Path for Vercel Serverless Functions
const API_BASE = '';

/**
 * Fetches the latest live sensor telemetry and current weather data.
 * Merges both into the feature format expected by the AgriML ML models.
 * Automatically falls back to simulated telemetry if hardware or endpoints are offline.
 */
async function getLatestSensorData() {
  try {
    const [sensorRes, weatherRes] = await Promise.allSettled([
      fetch(`${API_BASE}/iot/latest`),
      fetch(`${API_BASE}/weather/current?latitude=28.6139&longitude=77.2090`)
    ]);

    let rainfall = 15.0;
    if (weatherRes.status === 'fulfilled' && weatherRes.value?.ok) {
      const weatherJson = await weatherRes.value.json();
      if (weatherJson && weatherJson.rainfall !== undefined) {
        rainfall = weatherJson.rainfall;
      }
    }

    if (sensorRes.status === 'fulfilled' && sensorRes.value?.ok) {
      const sensorJson = await sensorRes.value.json();
      const sensor = sensorJson.sensor_data || sensorJson;
      return {
        nitrogen: sensor.nitrogen ?? 45,
        phosphorus: sensor.phosphorus ?? 38,
        potassium: sensor.potassium ?? 32,
        pH: sensor.soil_ph ?? 6.5,
        moisture: sensor.soil_moisture ?? 58.0,
        temperature: sensor.temperature ?? 27.5,
        humidity: sensor.humidity ?? 65.0,
        rainfall: rainfall
      };
    }
  } catch (err) {
    console.warn("Live telemetry offline. Activating simulation fallback:", err);
  }

  // Realistic mock telemetry ensuring the button always succeeds
  return {
    nitrogen: 45,
    phosphorus: 38,
    potassium: 35,
    pH: 6.5,
    moisture: 60.0,
    temperature: 28.0,
    humidity: 65.0,
    rainfall: 12.0
  };
}

/**
 * Triggers asynchronous reasoning by the AI Decision Agent orchestrator.
 * Renders output dynamically into #agent-decision-box.
 */
async function fetchAgentDecision(imputed, fertResult, yieldResult) {
  try {
    const response = await fetch(`${API_BASE}/agent/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        crop: imputed.crop,
        sensor_data: {
          soil_moisture: imputed.moisture,
          temperature: imputed.temperature,
          humidity: imputed.humidity,
          soil_ph: imputed.pH,
          nitrogen: imputed.nitrogen,
          phosphorus: imputed.phosphorus,
          potassium: imputed.potassium
        },
        weather_data: {
          rainfall: imputed.rainfall,
          temperature: imputed.temperature
        },
        ml_prediction: {
          fertilizer: fertResult.fertilizer,
          yield: yieldResult.yield,
          confidence: fertResult.confidence
        }
      })
    });

    if (!response.ok) return;

    const agentData = await response.json();
    state.lastResult.agentDecision = agentData;

    const agentContainer = document.getElementById('agent-decision-box');
    if (agentContainer) {
      const riskColor = agentData.overall_risk === 'HIGH' 
        ? '#ef4444' 
        : agentData.overall_risk === 'MEDIUM' 
          ? '#f59e0b' 
          : '#10b981';

      agentContainer.innerHTML = `
        <div class="card" style="border-left: 4px solid ${riskColor}; background: #0f172a; margin-bottom: var(--sp-md); animation: fadeIn 0.3s ease;">
          <div class="card-title" style="display:flex; justify-content:space-between; align-items:center;">
            <span>🤖 AI Decision Agent Advice</span>
            <span class="badge" style="background:${riskColor}; color:#fff; padding:3px 10px; border-radius:4px; font-size:11px; font-weight:bold;">
              RISK: ${agentData.overall_risk}
            </span>
          </div>
          <div style="margin: 10px 0; color: #f8fafc;">
            <strong>Primary Action Plan:</strong>
            <ul style="margin: 8px 0 12px 20px; line-height: 1.6;">
              ${agentData.primary_actions.map(act => `<li>${act}</li>`).join('')}
            </ul>
          </div>
          <div style="font-size: 12px; color: #94a3b8; background: #1e293b; padding: 10px 14px; border-radius: 6px; border: 1px solid #334155;">
            📖 <strong>RAG Agronomic Grounding:</strong> ${agentData.rag_grounding_knowledge}
          </div>
        </div>
      `;
    }
  } catch (err) {
    console.warn('AI Decision Agent non-blocking failure:', err);
  }
}

// Global state
const state = {
  fertModel: null,
  yieldModel: null,
  normParams: null,
  featureImportance: null,
  trained: false,
  history: [],
  soilTracker: new SoilHealthTracker(),
  adaptiveLearning: new AdaptiveLearningSystem(),
  climateEngine: new ClimateEngine(),
  feedbackLoop: new FeedbackLoop(),
  scenarioSimulator: null,
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
  state.scenarioSimulator = new ScenarioSimulator(predict);

  await new Promise(r => setTimeout(r, 300));
  hideTrainingOverlay();
}

function predict(input) {
  if (!state.trained) return null;

  const imputed = imputeMissing([input])[0];
  const normed = normalizeSingle(imputed, state.normParams);
  const encoded = oneHotEncode([normed], CROP_TYPES)[0];

  // Core ML model inference
  const fertResult = state.fertModel.predict(encoded);
  const yieldResult = state.yieldModel.predict(encoded);

  // Adaptive learning: adjust yield based on historical correction
  yieldResult.yield = Math.round(
    state.adaptiveLearning.adjustPrediction(imputed.crop, yieldResult.yield) * 100
  ) / 100;

  // Fertilizer optimization & climate adjustments
  const optResult = optimizeFertilizer(imputed, fertResult.fertilizer, yieldResult.yield);
  const climateImpact = state.climateEngine.analyzeClimateImpact(imputed);
  optResult.quantityPerHectare = Math.round(optResult.quantityPerHectare * climateImpact.quantityMultiplier);
  optResult.totalQuantity = Math.round(optResult.quantityPerHectare * (imputed.landArea || 1));

  // Soil health tracking & degradation modeling
  state.soilTracker.record(imputed);
  const soilDegradation = state.soilTracker.predictDegradation(6);

  // Sustainability scoring & risk analysis
  const sustainability = computeSustainabilityScore(imputed, optResult, soilDegradation);
  const risks = predictRisks(imputed, yieldResult, optResult);

  // Feature explanations
  const explanations = generateExplanation(
    imputed,
    fertResult,
    yieldResult,
    optResult,
    state.featureImportance
  );

  // Record recommendation for adaptive learning
  state.adaptiveLearning.recordRecommendation(imputed, fertResult, yieldResult, optResult);

  // Persist run state
  state.history.push({
    timestamp: Date.now(),
    input: imputed,
    fertResult,
    yieldResult,
    optResult,
    explanations
  });

  state.lastInput = imputed;
  state.lastResult = {
    fertResult,
    yieldResult,
    optResult,
    explanations,
    featureImportance: state.featureImportance,
    climateImpact,
    soilDegradation,
    sustainability,
    risks,
    agentDecision: null
  };

  // Dispatch asynchronous Agent Orchestrator reasoning
  fetchAgentDecision(imputed, fertResult, yieldResult);

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
  const entry = state.feedbackLoop.submit(feedbackData);
  state.adaptiveLearning.recordFeedback(
    feedbackData.actualYield,
    feedbackData.actualFertilizerUsed || feedbackData.recommendedFertilizer,
    feedbackData.crop,
    feedbackData.satisfaction
  );
  return entry;
}

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
    onLoadSensorData: async () => {
      return await getLatestSensorData();
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
    console.error('Model training failed:', err);
    hideTrainingOverlay();
  });
}

function showLandingPage() {
  const app = document.getElementById('app');
  renderLandingPage(app, () => {
    showAuthPage();
  });
}

function showAuthPage() {
  const app = document.getElementById('app');
  renderAuthPage(
    app,
    () => {
      setTimeout(() => initDashboard(), 100);
    },
    () => {
      showLandingPage();
    }
  );
}

function init() {
  if (isLoggedIn()) {
    initDashboard();
  } else {
    showLandingPage();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}