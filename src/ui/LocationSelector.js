// LocationSelector.js — India Location + Soil Type Selector UI
import { INDIA_STATES } from '../data/indiaLocationData.js';
import { SOIL_TYPES } from '../data/soilTypes.js';
import { LOCATION_CROP_DATA, getCropSuggestions } from '../data/locationCropData.js';

let _currentState = null;
let _currentDistrict = null;
let _currentVillage = null;
let _currentSoil = null;

export function getCurrentLocation() {
  return { state: _currentState, district: _currentDistrict, village: _currentVillage, soil: _currentSoil };
}

export function renderLocationCard() {
  const stateOptions = Object.keys(INDIA_STATES).sort()
    .map(s => `<option value="${s}">${s}</option>`).join('');
  const soilOptions = Object.entries(SOIL_TYPES)
    .map(([k, v]) => `<option value="${k}">${v.emoji} ${v.name}</option>`).join('');

  return `
    <div class="card location-card" id="location-card">
      <div class="card-title">
        <span class="card-title-icon">📍</span>
        Farm Location
      </div>

      <div class="form-group">
        <label class="form-label">State / UT</label>
        <select class="form-select location-select" id="loc-state">
          <option value="">— Select State —</option>
          ${stateOptions}
        </select>
      </div>

      <div class="form-group" id="district-group" style="display:none">
        <label class="form-label">District</label>
        <select class="form-select location-select" id="loc-district">
          <option value="">— Select District —</option>
        </select>
      </div>

      <div class="form-group" id="village-group" style="display:none">
        <label class="form-label">Village / Town</label>
        <div class="village-input-wrap">
          <input type="text" class="form-input village-text-input" id="loc-village-input"
            list="village-datalist" placeholder="Type or select your village..." autocomplete="off">
          <datalist id="village-datalist"></datalist>
          <span class="village-hint">💡 Type your village name. Popular villages shown in suggestions.</span>
        </div>
      </div>

      <div id="location-suggestions"></div>
    </div>

    <div class="card soil-card" id="soil-card">
      <div class="card-title">
        <span class="card-title-icon">🪨</span>
        Soil Type
      </div>

      <div class="form-group">
        <label class="form-label">Select Soil Type</label>
        <select class="form-select location-select" id="loc-soil">
          <option value="">— Select Soil Type —</option>
          ${soilOptions}
        </select>
      </div>

      <div id="soil-info-panel"></div>
      <div id="soil-suggestions"></div>
    </div>
  `;
}

function renderCropChips(crops, category, colorClass) {
  if (!crops || crops.length === 0) return '';
  return `
    <div class="crop-chip-group">
      <span class="crop-chip-label ${colorClass}">${category}</span>
      <div class="crop-chips">
        ${crops.map(c => `<span class="crop-chip ${colorClass}">${c}</span>`).join('')}
      </div>
    </div>
  `;
}

function updateLocationSuggestions() {
  const panel = document.getElementById('location-suggestions');
  if (!panel) return;

  if (!_currentState) { panel.innerHTML = ''; return; }

  const locData = LOCATION_CROP_DATA[_currentState];
  if (!locData) { panel.innerHTML = ''; return; }

  const soilData = _currentSoil ? SOIL_TYPES[_currentSoil] : null;
  const { highConfidence } = getCropSuggestions(_currentState, _currentSoil, soilData);

  const locationLabel = _currentDistrict
    ? `${_currentDistrict}, ${_currentState}`
    : _currentState;

  let html = `
    <div class="suggestion-panel">
      <div class="suggestion-title">
        🌾 Recommended Crops for <strong>${locationLabel}</strong>
        ${_currentVillage ? `<span class="village-tag">📍 ${_currentVillage}</span>` : ''}
      </div>
      <div class="suggestion-note">Based on regional climate, agro-zone & traditional farming patterns</div>
      ${highConfidence.length > 0 ? `
        <div class="high-confidence-section">
          <span class="hc-label">⭐ Best Match (Location + Soil)</span>
          <div class="crop-chips">
            ${highConfidence.map(c => `<span class="crop-chip chip-best">${c}</span>`).join('')}
          </div>
        </div>
      ` : ''}
      ${renderCropChips(locData.primary, '🌱 Primary Crops', 'chip-primary')}
      ${renderCropChips(locData.secondary, '🌿 Secondary Crops', 'chip-secondary')}
      ${renderCropChips(locData.cash, '💰 Cash Crops', 'chip-cash')}
      ${renderCropChips(locData.horticulture, '🍎 Horticulture', 'chip-horti')}
    </div>
  `;
  panel.innerHTML = html;
}

function updateSoilInfo() {
  const infoPanel = document.getElementById('soil-info-panel');
  const sugPanel = document.getElementById('soil-suggestions');
  if (!infoPanel || !sugPanel) return;

  if (!_currentSoil) { infoPanel.innerHTML = ''; sugPanel.innerHTML = ''; return; }

  const soil = SOIL_TYPES[_currentSoil];
  if (!soil) return;

  infoPanel.innerHTML = `
    <div class="soil-info-card" style="border-left: 4px solid ${soil.color}">
      <div class="soil-info-header">
        <span class="soil-emoji">${soil.emoji}</span>
        <div>
          <div class="soil-name">${soil.name}</div>
          <div class="soil-region">📍 ${soil.regions}</div>
        </div>
      </div>
      <div class="soil-description">${soil.description}</div>
      <div class="soil-props">
        <div class="soil-prop"><span>pH Range</span><strong>${soil.ph}</strong></div>
        <div class="soil-prop"><span>Water Retention</span><strong>${soil.waterRetention}</strong></div>
        <div class="soil-prop"><span>Texture</span><strong>${soil.texture}</strong></div>
        <div class="soil-prop"><span>Nutrients</span><strong>${soil.nutrients}</strong></div>
      </div>
      <div class="soil-tip">💡 ${soil.tips}</div>
    </div>
  `;

  sugPanel.innerHTML = `
    <div class="suggestion-panel">
      <div class="suggestion-title">🌾 Best Crops for ${soil.name}</div>
      <div class="crop-chips">
        ${soil.bestCrops.map(c => `<span class="crop-chip chip-soil">${c}</span>`).join('')}
      </div>
      ${soil.avoidCrops.length > 0 ? `
        <div class="avoid-crops">
          <span class="avoid-label">⚠️ Avoid:</span>
          ${soil.avoidCrops.map(c => `<span class="crop-chip chip-avoid">${c}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `;

  // Update location suggestions to show high-confidence combined results
  updateLocationSuggestions();
}

export function wireLocationSelector(container) {
  const stateEl = container.querySelector('#loc-state');
  const districtEl = container.querySelector('#loc-district');
  const villageInput = container.querySelector('#loc-village-input');
  const datalist = container.querySelector('#village-datalist');
  const soilEl = container.querySelector('#loc-soil');

  if (stateEl) {
    stateEl.addEventListener('change', () => {
      _currentState = stateEl.value || null;
      _currentDistrict = null;
      _currentVillage = null;

      const distGroup = container.querySelector('#district-group');
      const villageGroup = container.querySelector('#village-group');

      if (_currentState && INDIA_STATES[_currentState]) {
        const districts = Object.keys(INDIA_STATES[_currentState].districts);
        districtEl.innerHTML = '<option value="">— Select District —</option>' +
          districts.sort().map(d => `<option value="${d}">${d}</option>`).join('');
        distGroup.style.display = 'block';
        villageGroup.style.display = 'none';
        if (villageInput) villageInput.value = '';
        if (datalist) datalist.innerHTML = '';
      } else {
        distGroup.style.display = 'none';
        villageGroup.style.display = 'none';
      }
      updateLocationSuggestions();
    });
  }

  if (districtEl) {
    districtEl.addEventListener('change', () => {
      _currentDistrict = districtEl.value || null;
      _currentVillage = null;

      const villageGroup = container.querySelector('#village-group');
      if (_currentState && _currentDistrict && INDIA_STATES[_currentState]?.districts[_currentDistrict]) {
        const villages = INDIA_STATES[_currentState].districts[_currentDistrict];
        // Populate datalist with known villages as suggestions
        if (datalist) {
          datalist.innerHTML = villages.map(v => `<option value="${v}">`).join('');
        }
        if (villageInput) villageInput.value = '';
        villageGroup.style.display = 'block';
      } else {
        villageGroup.style.display = 'none';
      }
      updateLocationSuggestions();
    });
  }

  if (villageInput) {
    // Allow any typed village name — not just dropdown options
    let debounce = null;
    villageInput.addEventListener('input', () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        _currentVillage = villageInput.value.trim() || null;
        updateLocationSuggestions();
      }, 300);
    });
    villageInput.addEventListener('change', () => {
      _currentVillage = villageInput.value.trim() || null;
      updateLocationSuggestions();
    });
  }

  if (soilEl) {
    soilEl.addEventListener('change', () => {
      _currentSoil = soilEl.value || null;
      updateSoilInfo();
    });
  }
}
