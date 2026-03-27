// Dashboard UI v2 — Full integration of all advanced features
// Panels: Input, Results, Climate, Risks, Sustainability, Scenarios, Feedback, Soil Trends, Learning Stats

import { WEATHER_ICONS } from '../ml/climateEngine.js';
import { renderKnowledgePanel, wireKnowledgeTabs } from './Knowledge.js';
import { renderLocationCard, wireLocationSelector } from './LocationSelector.js';

let _handlers = {};

export function renderDashboard(container, cropTypes, handlers) {
  _handlers = handlers;

  container.innerHTML = `
    <div id="training-overlay" class="training-overlay" style="display:none">
      <div class="training-spinner"></div>
      <div class="training-text">Training ML Models</div>
      <div class="training-sub">Analyzing 2,000 agricultural samples with advanced AI...</div>
    </div>

    <header class="header">
      <div class="header-left">
        <span class="header-logo">🌾</span>
        <div>
          <div class="header-title">AgriML</div>
          <div class="header-subtitle">Intelligent Agricultural Decision Support System</div>
        </div>
      </div>
      <div class="header-status">
        ${handlers.user ? `<span class="header-user">👤 ${handlers.user.name || handlers.user.email}</span>` : ''}
        ${handlers.onLogout ? `<button class="btn-logout" id="btn-logout">Logout</button>` : ''}
        <span class="status-dot"></span>
        <span id="model-status">Models Ready</span>
      </div>
    </header>

    <div class="dashboard">
      <aside class="sidebar" id="sidebar">
        ${renderLocationCard()}
        ${renderInputForm(cropTypes)}
      </aside>
      <main class="main-content" id="main-content">
        ${renderPlaceholder()}
      </main>
    </div>
  `;

  wireForm(container, handlers);
  wireLocationSelector(container);

  // Wire logout
  const logoutBtn = container.querySelector('#btn-logout');
  if (logoutBtn && handlers.onLogout) {
    logoutBtn.addEventListener('click', handlers.onLogout);
  }
}

function renderInputForm(cropTypes) {
  return `
    <div class="card">
      <div class="card-title"><span class="card-title-icon">🧪</span> Soil Nutrients</div>
      <div class="form-group">
        <label class="form-label">Nitrogen (N) <span class="form-label-value" id="val-nitrogen">60 kg/ha</span></label>
        <input type="range" class="form-range" id="input-nitrogen" min="0" max="250" value="60" step="1">
      </div>
      <div class="form-group">
        <label class="form-label">Phosphorus (P) <span class="form-label-value" id="val-phosphorus">40 kg/ha</span></label>
        <input type="range" class="form-range" id="input-phosphorus" min="0" max="150" value="40" step="1">
      </div>
      <div class="form-group">
        <label class="form-label">Potassium (K) <span class="form-label-value" id="val-potassium">35 kg/ha</span></label>
        <input type="range" class="form-range" id="input-potassium" min="0" max="150" value="35" step="1">
      </div>
      <div class="section-divider"></div>
      <div class="form-group">
        <label class="form-label">Soil pH <span class="form-label-value" id="val-ph">6.5</span></label>
        <input type="range" class="form-range" id="input-ph" min="3" max="10" value="6.5" step="0.1">
      </div>
      <div class="form-group">
        <label class="form-label">Soil Moisture <span class="form-label-value" id="val-moisture">55%</span></label>
        <input type="range" class="form-range" id="input-moisture" min="5" max="100" value="55" step="1">
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="card-title-icon">🌤️</span> Environmental Conditions</div>
      <div class="input-row">
        <div class="form-group">
          <label class="form-label">Temperature</label>
          <input type="number" class="form-input" id="input-temperature" value="28" min="-10" max="55" step="0.5" placeholder="°C">
        </div>
        <div class="form-group">
          <label class="form-label">Rainfall</label>
          <input type="number" class="form-input" id="input-rainfall" value="150" min="0" max="500" step="5" placeholder="mm">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Humidity <span class="form-label-value" id="val-humidity">65%</span></label>
        <input type="range" class="form-range" id="input-humidity" min="10" max="100" value="65" step="1">
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="card-title-icon">🌱</span> Crop Information</div>
      <div class="form-group">
        <label class="form-label">Crop Type</label>
        <select class="form-select" id="input-crop">
          ${cropTypes.map(c => `<option value="${c}" ${c === 'Rice' ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
      <div class="input-row">
        <div class="form-group">
          <label class="form-label">Land Area (ha)</label>
          <input type="number" class="form-input" id="input-land-area" value="1" min="0.1" max="1000" step="0.1">
        </div>
        <div class="form-group">
          <label class="form-label">Historical Yield</label>
          <input type="number" class="form-input" id="input-hist-yield" value="" min="0" max="200" step="0.1" placeholder="t/ha (optional)">
        </div>
      </div>
    </div>

    <div class="analyze-bar-container">
      <button class="btn-primary" id="btn-analyze">🔬 Analyze & Recommend</button>
    </div>
  `;
}

function renderPlaceholder() {
  return `
    <div class="placeholder-container">
      <div class="animated-quote-container">
        <div class="quote-slider">
          <div class="quote-slide">"To plant a garden is to believe in tomorrow."<br/><span>- Audrey Hepburn</span></div>
          <div class="quote-slide">"Farming is a profession of hope."<br/><span>- Brian Brett</span></div>
          <div class="quote-slide">"Agriculture is our wisest pursuit, because it will in the end contribute most to real wealth, good morals & happiness."<br/><span>- Thomas Jefferson</span></div>
        </div>
      </div>
      
      <div class="placeholder-state" style="background-image: url('/images/dashboard-field.png')">
        <div class="placeholder-bg-overlay"></div>
        <div class="placeholder-icon">🌿</div>
        <div class="placeholder-title">Ready to Analyze</div>
        <div class="placeholder-desc">
          Adjust soil nutrients, environmental conditions, and crop type, then click <strong>Analyze & Recommend</strong> to get AI-powered recommendations with risk analysis, sustainability scoring, and scenario simulation.
        </div>
      </div>
    </div>
  `;
}

function wireForm(container, handlers) {
  const ranges = [
    { id: 'input-nitrogen', valId: 'val-nitrogen', suffix: ' kg/ha' },
    { id: 'input-phosphorus', valId: 'val-phosphorus', suffix: ' kg/ha' },
    { id: 'input-potassium', valId: 'val-potassium', suffix: ' kg/ha' },
    { id: 'input-ph', valId: 'val-ph', suffix: '' },
    { id: 'input-moisture', valId: 'val-moisture', suffix: '%' },
    { id: 'input-humidity', valId: 'val-humidity', suffix: '%' },
  ];

  for (const r of ranges) {
    const el = container.querySelector(`#${r.id}`);
    const valEl = container.querySelector(`#${r.valId}`);
    if (el && valEl) el.addEventListener('input', () => { valEl.textContent = el.value + r.suffix; });
  }

  container.querySelector('#btn-analyze').addEventListener('click', () => {
    const btn = container.querySelector('#btn-analyze');
    btn.classList.add('btn-loading');
    btn.textContent = 'Analyzing...';
    setTimeout(() => {
      const formData = getFormData(container);
      handlers.onAnalyze(formData);
      btn.classList.remove('btn-loading');
      btn.textContent = '🔬 Analyze & Recommend';
    }, 300);
  });
}

function getFormData(container) {
  return {
    nitrogen: parseFloat(container.querySelector('#input-nitrogen').value),
    phosphorus: parseFloat(container.querySelector('#input-phosphorus').value),
    potassium: parseFloat(container.querySelector('#input-potassium').value),
    pH: parseFloat(container.querySelector('#input-ph').value),
    moisture: parseFloat(container.querySelector('#input-moisture').value),
    temperature: parseFloat(container.querySelector('#input-temperature').value),
    rainfall: parseFloat(container.querySelector('#input-rainfall').value),
    humidity: parseFloat(container.querySelector('#input-humidity').value),
    crop: container.querySelector('#input-crop').value,
    landArea: parseFloat(container.querySelector('#input-land-area').value) || 1,
    historicalYield: parseFloat(container.querySelector('#input-hist-yield').value) || null,
  };
}

// ==================== RESULTS UPDATE ====================
export function updateResults(result, appState) {
  const main = document.getElementById('main-content');
  if (!main) return;

  const { fertResult, yieldResult, optResult, explanations, climateImpact, soilDegradation, sustainability, risks } = result;
  const alertIcons = { critical: '🚨', warning: '⚠️', info: 'ℹ️' };
  const learningStats = appState?.adaptiveLearning?.getStats();
  const feedbackStats = appState?.feedbackLoop?.getStats();

  main.innerHTML = `
    <!-- Tab Navigation -->
    <div class="tab-nav" id="tab-nav">
      <button class="tab-btn active" data-tab="overview">📊 Overview</button>
      <button class="tab-btn" data-tab="climate">🌦️ Climate</button>
      <button class="tab-btn" data-tab="risks">⚠️ Risks</button>
      <button class="tab-btn" data-tab="sustainability">🌿 Sustainability</button>
      <button class="tab-btn" data-tab="scenarios">🔮 Scenarios</button>
      <button class="tab-btn" data-tab="learning">🧠 Learning</button>
      <button class="tab-btn" data-tab="feedback">📝 Feedback</button>
      <button class="tab-btn" data-tab="knowledge">📖 Knowledge</button>
    </div>

    <!-- TAB: Overview -->
    <div class="tab-panel active" id="panel-overview">
      ${renderOverviewPanel(fertResult, yieldResult, optResult, explanations, alertIcons)}
    </div>

    <!-- TAB: Climate -->
    <div class="tab-panel" id="panel-climate">
      ${renderClimatePanel(climateImpact)}
    </div>

    <!-- TAB: Risks -->
    <div class="tab-panel" id="panel-risks">
      ${renderRisksPanel(risks)}
    </div>

    <!-- TAB: Sustainability -->
    <div class="tab-panel" id="panel-sustainability">
      ${renderSustainabilityPanel(sustainability)}
    </div>

    <!-- TAB: Scenarios -->
    <div class="tab-panel" id="panel-scenarios">
      ${renderScenariosPanel(appState)}
    </div>

    <!-- TAB: Learning -->
    <div class="tab-panel" id="panel-learning">
      ${renderLearningPanel(learningStats, soilDegradation, feedbackStats)}
    </div>

    <!-- TAB: Feedback -->
    <div class="tab-panel" id="panel-feedback">
      ${renderFeedbackPanel(fertResult, yieldResult, appState)}
    </div>

    <!-- TAB: Knowledge -->
    <div class="tab-panel" id="panel-knowledge">
      ${renderKnowledgePanel()}
    </div>

    <!-- Charts always visible at bottom -->
    <div class="charts-row" id="charts-row">
      <div class="chart-container"><div class="chart-title">📊 Soil Nutrient Profile</div><canvas id="chart-radar"></canvas></div>
      <div class="chart-container"><div class="chart-title">📈 Feature Importance</div><canvas id="chart-importance"></canvas></div>
    </div>
    <div class="charts-row">
      <div class="chart-container"><div class="chart-title">🧪 Nutrient Deficit</div><canvas id="chart-deficit"></canvas></div>
      <div class="chart-container"><div class="chart-title">🎯 Fertilizer Probability</div><canvas id="chart-probabilities"></canvas></div>
    </div>
  `;

  wireTabNav();
  wireScenarioButtons(appState);
  wireFeedbackForm(appState);
  wireKnowledgeTabs();
}

// ==================== TAB NAVIGATION ====================
function wireTabNav() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(`panel-${btn.dataset.tab}`);
      if (panel) panel.classList.add('active');
    });
  });
}

// ==================== OVERVIEW PANEL ====================
function renderOverviewPanel(fertResult, yieldResult, optResult, explanations, alertIcons) {
  return `
    <div class="results-row">
      <div class="result-card" style="animation-delay:.05s">
        <div class="result-card-icon">🧪</div>
        <div class="result-card-label">Recommended Fertilizer</div>
        <div class="result-card-value accent">${fertResult.fertilizer}</div>
        <div class="result-card-sub">Confidence: ${Math.round(fertResult.confidence * 100)}%</div>
        <div class="confidence-bar"><div class="confidence-fill" style="width:${fertResult.confidence * 100}%"></div></div>
      </div>
      <div class="result-card" style="animation-delay:.15s">
        <div class="result-card-icon">📦</div>
        <div class="result-card-label">Suggested Quantity</div>
        <div class="result-card-value">${optResult.quantityPerHectare} <span style="font-size:.6em;color:var(--clr-text-muted)">kg/ha</span></div>
        <div class="result-card-sub">Total: ${optResult.totalQuantity} kg for ${optResult.landArea} ha</div>
        <div class="result-card-sub" style="color:var(--clr-accent)">Est. Cost: ₹${optResult.costEstimate.toLocaleString()}</div>
      </div>
      <div class="result-card" style="animation-delay:.25s">
        <div class="result-card-icon">🌾</div>
        <div class="result-card-label">Expected Yield</div>
        <div class="result-card-value yield-color">${yieldResult.yield} <span style="font-size:.6em;color:var(--clr-text-muted)">t/ha</span></div>
        <div class="result-card-sub">Confidence: ${Math.round(yieldResult.confidence * 100)}%</div>
        <div class="confidence-bar"><div class="confidence-fill yield-bar" style="width:${yieldResult.confidence * 100}%"></div></div>
      </div>
      <div class="result-card" style="animation-delay:.35s">
        <div class="result-card-icon">⚡</div>
        <div class="result-card-label">Optimization Score</div>
        <div class="score-ring">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle class="score-ring-bg" cx="40" cy="40" r="34"></circle>
            <circle class="score-ring-fill" cx="40" cy="40" r="34"
              stroke="${optResult.optimizationScore > 70 ? 'var(--clr-accent)' : optResult.optimizationScore > 40 ? 'var(--clr-yield)' : 'var(--clr-danger)'}"
              stroke-dasharray="${2 * Math.PI * 34}" stroke-dashoffset="${2 * Math.PI * 34 * (1 - optResult.optimizationScore / 100)}">
            </circle>
          </svg>
          <div class="score-ring-text">${optResult.optimizationScore}</div>
        </div>
        <div class="result-card-sub">Env. Impact: ${optResult.environmentalImpact < 30 ? 'Low' : optResult.environmentalImpact < 60 ? 'Moderate' : 'High'}</div>
        <div class="impact-bar-track">
          <div class="impact-bar-fill ${optResult.environmentalImpact < 30 ? 'impact-low' : optResult.environmentalImpact < 60 ? 'impact-medium' : 'impact-high'}"
            style="width:${optResult.environmentalImpact}%"></div>
        </div>
      </div>
    </div>

    ${optResult.alerts.length > 0 ? `
    <div class="card"><div class="card-title"><span class="card-title-icon">🔔</span> Alerts</div>
      <div class="alerts-container">
        ${optResult.alerts.map((a, i) => `<div class="alert alert-${a.level}"><span class="alert-icon">${alertIcons[a.level] || 'ℹ️'}</span><span>${a.message}</span></div>`).join('')}
      </div>
    </div>` : ''}

    <div class="card"><div class="card-title"><span class="card-title-icon">💡</span> AI Explanation</div>
      <ul class="explanation-list">
        ${explanations.map(e => `<li class="explanation-item"><span class="explanation-icon">▸</span><span>${e}</span></li>`).join('')}
      </ul>
    </div>
  `;
}

// ==================== CLIMATE PANEL ====================
function renderClimatePanel(climateImpact) {
  if (!climateImpact) return '<div class="card"><p>Climate data unavailable.</p></div>';

  return `
    <div class="card">
      <div class="card-title"><span class="card-title-icon">🌦️</span> Climate-Aware Recommendations</div>
      <div class="climate-summary">
        <div class="climate-stat">
          <div class="climate-stat-value">${climateImpact.totalRainfall}mm</div>
          <div class="climate-stat-label">Expected Rain (5 days)</div>
        </div>
        <div class="climate-stat">
          <div class="climate-stat-value">${climateImpact.avgTemperature}°C</div>
          <div class="climate-stat-label">Avg Temperature</div>
        </div>
        <div class="climate-stat">
          <div class="climate-stat-value">${climateImpact.bestApplicationDay}</div>
          <div class="climate-stat-label">Best Application Day</div>
        </div>
        <div class="climate-stat">
          <div class="climate-stat-value risk-${climateImpact.riskLevel}">${climateImpact.riskLevel.toUpperCase()}</div>
          <div class="climate-stat-label">Weather Risk</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="card-title-icon">📅</span> 5-Day Forecast</div>
      <div class="forecast-grid">
        ${climateImpact.forecast.map(day => `
          <div class="forecast-day">
            <div class="forecast-day-name">${day.dayName}</div>
            <div class="forecast-icon">${WEATHER_ICONS[day.condition] || '☁️'}</div>
            <div class="forecast-temp">${day.tempHigh}° / ${day.tempLow}°</div>
            <div class="forecast-rain">${day.rainfall > 0 ? '🌧 ' + day.rainfall + 'mm' : '—'}</div>
          </div>
        `).join('')}
      </div>
    </div>

    ${climateImpact.adjustments.length > 0 ? `
    <div class="card">
      <div class="card-title"><span class="card-title-icon">🔧</span> Climate Adjustments</div>
      <div class="alerts-container">
        ${climateImpact.adjustments.map(a => `
          <div class="alert alert-${a.severity === 'high' ? 'critical' : a.severity === 'medium' ? 'warning' : 'info'}">
            <span class="alert-icon">${a.severity === 'high' ? '🚨' : a.severity === 'medium' ? '⚠️' : 'ℹ️'}</span>
            <div><strong>${a.factor}</strong><br>${a.impact}</div>
          </div>
        `).join('')}
      </div>
      <p class="timing-advice">${climateImpact.timingAdvice}</p>
    </div>` : ''}
  `;
}

// ==================== RISKS PANEL ====================
function renderRisksPanel(risks) {
  if (!risks) return '<div class="card"><p>Risk data unavailable.</p></div>';

  const riskLevelColors = { high: 'var(--clr-danger)', medium: 'var(--clr-warning)', low: 'var(--clr-accent)' };

  return `
    <div class="card">
      <div class="card-title"><span class="card-title-icon">⚠️</span> Risk Assessment Dashboard</div>
      <div class="risk-overview">
        <div class="risk-score-display">
          <div class="score-ring" style="width:100px;height:100px">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle class="score-ring-bg" cx="50" cy="50" r="42" stroke-width="8"></circle>
              <circle class="score-ring-fill" cx="50" cy="50" r="42" stroke-width="8"
                stroke="${riskLevelColors[risks.overallRiskLevel]}"
                stroke-dasharray="${2 * Math.PI * 42}" stroke-dashoffset="${2 * Math.PI * 42 * (1 - risks.riskScore / 100)}">
              </circle>
            </svg>
            <div class="score-ring-text" style="font-size:1.3rem">${risks.riskScore}</div>
          </div>
          <div class="risk-level-label risk-${risks.overallRiskLevel}">${risks.overallRiskLevel.toUpperCase()} RISK</div>
        </div>
        <div class="risk-counts">
          <div class="risk-count-item"><span class="risk-dot high"></span> ${risks.riskCount.high} High</div>
          <div class="risk-count-item"><span class="risk-dot medium"></span> ${risks.riskCount.medium} Medium</div>
          <div class="risk-count-item"><span class="risk-dot low"></span> ${risks.riskCount.low} Low</div>
        </div>
      </div>
    </div>

    ${risks.risks.length > 0 ? risks.risks.map(r => `
    <div class="card risk-card risk-${r.severity}">
      <div class="card-title"><span class="card-title-icon">${r.icon}</span> ${r.category}
        <span class="risk-badge risk-badge-${r.severity}">${r.severity.toUpperCase()}</span>
        <span class="risk-probability">${r.probability}% likely</span>
      </div>
      <p class="risk-description">${r.description}</p>
      <div class="risk-recommendation"><strong>Recommendation:</strong> ${r.recommendation}</div>
    </div>
    `).join('') : '<div class="card"><div class="card-title"><span class="card-title-icon">✅</span> No Significant Risks Detected</div><p style="color:var(--clr-text-secondary)">Current conditions are within safe parameters. Continue monitoring.</p></div>'}
  `;
}

// ==================== SUSTAINABILITY PANEL ====================
function renderSustainabilityPanel(sustainability) {
  if (!sustainability) return '<div class="card"><p>Sustainability data unavailable.</p></div>';

  const compLabels = {
    fertilizerEfficiency: { name: 'Fertilizer Efficiency', icon: '🧪' },
    soilBalance: { name: 'Soil Balance', icon: '⚖️' },
    environmentalScore: { name: 'Environmental', icon: '🌍' },
    waterImpact: { name: 'Water Impact', icon: '💧' },
    soilHealthTrend: { name: 'Soil Health Trend', icon: '🌱' },
    carbonFootprint: { name: 'Carbon Footprint', icon: '♻️' }
  };

  return `
    <div class="card">
      <div class="card-title"><span class="card-title-icon">🌿</span> Sustainability Index</div>
      <div class="sustainability-header">
        <div class="sustainability-grade grade-${sustainability.grade.toLowerCase()}">${sustainability.grade}</div>
        <div>
          <div class="sustainability-score">${sustainability.overallScore}/100</div>
          <div class="sustainability-label">${sustainability.gradeLabel}</div>
        </div>
      </div>
      ${sustainability.badges.length > 0 ? `
      <div class="badge-row">
        ${sustainability.badges.map(b => `<span class="eco-badge">${b.icon} ${b.label}</span>`).join('')}
      </div>` : ''}
    </div>

    <div class="card">
      <div class="card-title"><span class="card-title-icon">📊</span> Component Scores</div>
      <div class="sustainability-grid">
        ${Object.entries(sustainability.components).map(([key, val]) => {
    const info = compLabels[key] || { name: key, icon: '📊' };
    const color = val >= 70 ? 'var(--clr-accent)' : val >= 40 ? 'var(--clr-yield)' : 'var(--clr-danger)';
    return `
          <div class="sustainability-item">
            <div class="sustainability-item-header">${info.icon} ${info.name}</div>
            <div class="sustainability-item-value" style="color:${color}">${val}</div>
            <div class="confidence-bar"><div class="confidence-fill" style="width:${val}%;background:${color}"></div></div>
          </div>`;
  }).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="card-title-icon">🌱</span> Eco-Friendly Recommendations</div>
      <ul class="explanation-list">
        ${sustainability.ecoRecommendations.map(r => `
          <li class="explanation-item"><span class="explanation-icon">${r.icon}</span><span>${r.text}</span></li>
        `).join('')}
      </ul>
    </div>
  `;
}

// ==================== SCENARIOS PANEL ====================
function renderScenariosPanel(appState) {
  const sim = appState?.scenarioSimulator;
  const lastInput = appState?.lastInput;
  if (!sim || !lastInput) return '<div class="card"><p>Run analysis first to enable scenario simulation.</p></div>';

  const presets = sim.getPresetScenarios(lastInput);

  return `
    <div class="card">
      <div class="card-title"><span class="card-title-icon">🔮</span> What-If Scenario Simulation</div>
      <p style="color:var(--clr-text-secondary);font-size:var(--fs-sm);margin-bottom:var(--sp-md)">
        Explore how changes in conditions affect your yield and recommendations.
      </p>
      <div class="scenario-grid">
        ${presets.map(p => `
          <button class="scenario-btn" data-scenario="${p.id}">
            <span class="scenario-icon">${p.icon}</span>
            <span class="scenario-name">${p.name}</span>
            <span class="scenario-desc">${p.description}</span>
          </button>
        `).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-title"><span class="card-title-icon">🎛️</span> Custom Scenario</div>
      <div class="input-row">
        <div class="form-group">
          <label class="form-label">Nitrogen</label>
          <input type="number" class="form-input" id="scenario-nitrogen" value="${lastInput.nitrogen}" min="0" max="250">
        </div>
        <div class="form-group">
          <label class="form-label">Rainfall (mm)</label>
          <input type="number" class="form-input" id="scenario-rainfall" value="${lastInput.rainfall}" min="0" max="500">
        </div>
      </div>
      <div class="input-row">
        <div class="form-group">
          <label class="form-label">Temperature (°C)</label>
          <input type="number" class="form-input" id="scenario-temp" value="${lastInput.temperature}" min="-10" max="55">
        </div>
        <div class="form-group">
          <label class="form-label">Moisture (%)</label>
          <input type="number" class="form-input" id="scenario-moisture" value="${lastInput.moisture}" min="5" max="100">
        </div>
      </div>
      <button class="btn-primary" id="btn-custom-scenario" style="margin-top:var(--sp-sm)">🧪 Run Custom Scenario</button>
    </div>

    <div id="scenario-results"></div>
  `;
}

function wireScenarioButtons(appState) {
  document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.scenario;
      const result = _handlers.onScenario?.(id);
      if (result) renderScenarioResult(result);
    });
  });

  const customBtn = document.getElementById('btn-custom-scenario');
  if (customBtn) {
    customBtn.addEventListener('click', () => {
      const mods = {
        nitrogen: parseFloat(document.getElementById('scenario-nitrogen').value),
        rainfall: parseFloat(document.getElementById('scenario-rainfall').value),
        temperature: parseFloat(document.getElementById('scenario-temp').value),
        moisture: parseFloat(document.getElementById('scenario-moisture').value)
      };
      const result = _handlers.onCustomScenario?.(mods);
      if (result) renderScenarioResult(result);
    });
  }
}

function renderScenarioResult(result) {
  const container = document.getElementById('scenario-results');
  if (!container) return;

  const d = result.deltas;
  const yieldColor = d.yield > 0 ? 'var(--clr-accent)' : d.yield < 0 ? 'var(--clr-danger)' : 'var(--clr-text-muted)';
  const costColor = d.cost < 0 ? 'var(--clr-accent)' : d.cost > 0 ? 'var(--clr-danger)' : 'var(--clr-text-muted)';
  const arrow = v => v > 0 ? '↑' : v < 0 ? '↓' : '→';

  container.innerHTML = `
    <div class="card" style="animation: fadeSlideUp 0.4s ease both; border-color: var(--clr-accent-dim);">
      <div class="card-title"><span class="card-title-icon">📊</span> Scenario Comparison</div>
      <div class="scenario-comparison">
        <div class="comparison-col">
          <div class="comparison-header">Current</div>
          <div class="comparison-value">${result.base.yield} t/ha</div>
          <div class="comparison-label">Yield</div>
          <div class="comparison-value">₹${result.base.cost.toLocaleString()}</div>
          <div class="comparison-label">Cost</div>
          <div class="comparison-value">${result.base.fertilizer}</div>
          <div class="comparison-label">Fertilizer</div>
        </div>
        <div class="comparison-arrow">
          <div class="delta-value" style="color:${yieldColor}">${arrow(d.yield)} ${d.yieldPercent > 0 ? '+' : ''}${d.yieldPercent}%</div>
          <div class="delta-value" style="color:${costColor}">${arrow(-d.cost)} ₹${Math.abs(d.cost)}</div>
          <div class="delta-value">${arrow(d.optimizationScore)} ${d.optimizationScore > 0 ? '+' : ''}${d.optimizationScore}</div>
        </div>
        <div class="comparison-col">
          <div class="comparison-header">Scenario</div>
          <div class="comparison-value" style="color:${yieldColor}">${result.scenario.yield} t/ha</div>
          <div class="comparison-label">Yield</div>
          <div class="comparison-value" style="color:${costColor}">₹${result.scenario.cost.toLocaleString()}</div>
          <div class="comparison-label">Cost</div>
          <div class="comparison-value">${result.scenario.fertilizer}</div>
          <div class="comparison-label">Fertilizer</div>
        </div>
      </div>
      <p class="timing-advice" style="margin-top:var(--sp-md)">${result.recommendation}</p>
    </div>
  `;
}

// ==================== LEARNING PANEL ====================
function renderLearningPanel(learningStats, soilDegradation, feedbackStats) {
  return `
    <div class="card">
      <div class="card-title"><span class="card-title-icon">🧠</span> Adaptive Learning Status</div>
      ${learningStats ? `
      <div class="learning-stats-grid">
        <div class="learning-stat">
          <div class="learning-stat-value">${learningStats.totalRecommendations}</div>
          <div class="learning-stat-label">Total Analyses</div>
        </div>
        <div class="learning-stat">
          <div class="learning-stat-value">${learningStats.feedbackReceived}</div>
          <div class="learning-stat-label">Feedback Entries</div>
        </div>
        <div class="learning-stat">
          <div class="learning-stat-value">${learningStats.estimatedAccuracy !== null ? learningStats.estimatedAccuracy + '%' : 'N/A'}</div>
          <div class="learning-stat-label">Est. Accuracy</div>
        </div>
        <div class="learning-stat">
          <div class="learning-stat-value status-${learningStats.learningStatus.toLowerCase().replace(' ', '-')}">${learningStats.learningStatus}</div>
          <div class="learning-stat-label">Status</div>
        </div>
      </div>
      <p style="color:var(--clr-text-secondary);font-size:var(--fs-sm);margin-top:var(--sp-md)">
        The system continuously learns from your feedback to personalize recommendations for your farm.
        ${learningStats.feedbackReceived < 3 ? 'Submit yield feedback after harvest to improve accuracy.' : ''}
      </p>` : '<p style="color:var(--clr-text-muted)">Run analysis to start tracking.</p>'}
    </div>

    <div class="card">
      <div class="card-title"><span class="card-title-icon">🌍</span> Soil Health Tracking</div>
      ${soilDegradation ? `
      <div class="soil-health-display">
        <div class="soil-health-score">
          <div class="score-ring" style="width:90px;height:90px">
            <svg width="90" height="90" viewBox="0 0 90 90">
              <circle class="score-ring-bg" cx="45" cy="45" r="38" stroke-width="7"></circle>
              <circle class="score-ring-fill" cx="45" cy="45" r="38" stroke-width="7"
                stroke="${soilDegradation.overallHealth > 70 ? 'var(--clr-accent)' : soilDegradation.overallHealth > 40 ? 'var(--clr-yield)' : 'var(--clr-danger)'}"
                stroke-dasharray="${2 * Math.PI * 38}" stroke-dashoffset="${2 * Math.PI * 38 * (1 - soilDegradation.overallHealth / 100)}">
              </circle>
            </svg>
            <div class="score-ring-text">${soilDegradation.overallHealth}</div>
          </div>
          <div style="font-size:var(--fs-sm);color:var(--clr-text-muted);margin-top:var(--sp-xs)">Soil Health</div>
        </div>
        <div class="soil-trends">
          ${Object.entries(soilDegradation.predictions).map(([nutrient, data]) => `
            <div class="soil-trend-item">
              <span class="soil-trend-name">${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}</span>
              <span class="soil-trend-badge trend-${data.trend}">${data.trend === 'declining' ? '↓' : data.trend === 'improving' ? '↑' : '→'} ${data.trend}</span>
              <span class="soil-trend-score">${data.healthScore}/100</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="section-divider" style="margin:var(--sp-md) 0"></div>
      <ul class="explanation-list">
        ${soilDegradation.recommendations.map(r => `<li class="explanation-item"><span class="explanation-icon">▸</span><span>${r}</span></li>`).join('')}
      </ul>
      ` : '<p style="color:var(--clr-text-muted)">Run multiple analyses to build soil health history.</p>'}
    </div>
  `;
}

// ==================== FEEDBACK PANEL ====================
function renderFeedbackPanel(fertResult, yieldResult, appState) {
  const feedbackStats = appState?.feedbackLoop?.getStats();
  const entries = appState?.feedbackLoop?.getEntries()?.slice(0, 5) || [];

  return `
    <div class="card">
      <div class="card-title"><span class="card-title-icon">📝</span> Submit Harvest Feedback</div>
      <p style="color:var(--clr-text-secondary);font-size:var(--fs-sm);margin-bottom:var(--sp-md)">
        Help the AI learn by reporting your actual harvest results. This data improves future predictions.
      </p>
      <div class="form-group">
        <label class="form-label">Crop Type</label>
        <input type="text" class="form-input" id="feedback-crop" value="${appState?.lastInput?.crop || 'Rice'}" readonly>
      </div>
      <div class="input-row">
        <div class="form-group">
          <label class="form-label">Predicted Yield (t/ha)</label>
          <input type="number" class="form-input" id="feedback-predicted" value="${yieldResult?.yield || 0}" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">Actual Yield (t/ha)</label>
          <input type="number" class="form-input" id="feedback-actual" value="" min="0" max="200" step="0.1" placeholder="Enter actual yield">
        </div>
      </div>
      <div class="input-row">
        <div class="form-group">
          <label class="form-label">Fertilizer Used</label>
          <input type="text" class="form-input" id="feedback-fert" value="${fertResult?.fertilizer || ''}" placeholder="e.g. Urea">
        </div>
        <div class="form-group">
          <label class="form-label">Quantity Used (kg)</label>
          <input type="number" class="form-input" id="feedback-qty" value="" min="0" max="2000" step="1" placeholder="kg total">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Satisfaction <span class="form-label-value" id="val-satisfaction">3/5</span></label>
        <input type="range" class="form-range" id="feedback-satisfaction" min="1" max="5" value="3" step="1">
      </div>
      <div class="form-group">
        <label class="form-label">Notes (optional)</label>
        <input type="text" class="form-input" id="feedback-notes" placeholder="Any observations...">
      </div>
      <button class="btn-primary" id="btn-submit-feedback">📤 Submit Feedback</button>
      <div id="feedback-status" style="margin-top:var(--sp-sm)"></div>
    </div>

    ${feedbackStats ? `
    <div class="card">
      <div class="card-title"><span class="card-title-icon">📊</span> Feedback History</div>
      <div class="learning-stats-grid">
        <div class="learning-stat">
          <div class="learning-stat-value">${feedbackStats.totalEntries}</div>
          <div class="learning-stat-label">Submissions</div>
        </div>
        <div class="learning-stat">
          <div class="learning-stat-value">${feedbackStats.avgAccuracy !== null ? feedbackStats.avgAccuracy + '%' : 'N/A'}</div>
          <div class="learning-stat-label">Avg Accuracy</div>
        </div>
        <div class="learning-stat">
          <div class="learning-stat-value">${feedbackStats.avgSatisfaction !== null ? feedbackStats.avgSatisfaction + '/5' : 'N/A'}</div>
          <div class="learning-stat-label">Avg Satisfaction</div>
        </div>
        <div class="learning-stat">
          <div class="learning-stat-value trend-${feedbackStats.trend}">${feedbackStats.trend === 'improving' ? '↑' : feedbackStats.trend === 'declining' ? '↓' : '→'} ${feedbackStats.trend}</div>
          <div class="learning-stat-label">Accuracy Trend</div>
        </div>
      </div>
    </div>` : ''}

    ${entries.length > 0 ? `
    <div class="card">
      <div class="card-title"><span class="card-title-icon">📋</span> Recent Entries</div>
      <div class="feedback-entries">
        ${entries.map(e => `
          <div class="feedback-entry">
            <div class="feedback-entry-header">
              <span>${e.crop}</span>
              <span class="feedback-entry-date">${new Date(e.timestamp).toLocaleDateString()}</span>
            </div>
            <div class="feedback-entry-values">
              <span>Predicted: ${e.predictedYield} t/ha</span>
              <span>Actual: ${e.actualYield} t/ha</span>
              <span class="feedback-accuracy">Accuracy: ${e.accuracy}%</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>` : ''}
  `;
}

function wireFeedbackForm(appState) {
  const satSlider = document.getElementById('feedback-satisfaction');
  const satVal = document.getElementById('val-satisfaction');
  if (satSlider && satVal) {
    satSlider.addEventListener('input', () => { satVal.textContent = satSlider.value + '/5'; });
  }

  const submitBtn = document.getElementById('btn-submit-feedback');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const actualYield = parseFloat(document.getElementById('feedback-actual')?.value);
      if (!actualYield || isNaN(actualYield)) {
        document.getElementById('feedback-status').innerHTML = '<div class="alert alert-warning"><span class="alert-icon">⚠️</span>Please enter actual yield.</div>';
        return;
      }

      const feedback = {
        crop: document.getElementById('feedback-crop').value,
        predictedYield: parseFloat(document.getElementById('feedback-predicted').value),
        actualYield,
        recommendedFertilizer: document.getElementById('feedback-fert').value,
        actualFertilizerUsed: document.getElementById('feedback-fert').value,
        quantityUsed: parseFloat(document.getElementById('feedback-qty')?.value) || 0,
        satisfaction: parseInt(document.getElementById('feedback-satisfaction').value),
        notes: document.getElementById('feedback-notes')?.value || ''
      };

      _handlers.onFeedback?.(feedback);
      document.getElementById('feedback-status').innerHTML = '<div class="alert alert-info"><span class="alert-icon">✅</span>Feedback submitted! The AI will use this to improve future predictions.</div>';
      submitBtn.disabled = true;
      submitBtn.textContent = '✅ Submitted';
    });
  }
}

export function showTrainingOverlay() {
  const el = document.getElementById('training-overlay');
  if (el) el.style.display = 'flex';
}

export function hideTrainingOverlay() {
  const el = document.getElementById('training-overlay');
  if (el) {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.5s ease';
    setTimeout(() => { el.style.display = 'none'; el.style.opacity = '1'; }, 500);
  }
}
