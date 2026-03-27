// LandingPage.js — Public landing page with Indian agriculture content

export function renderLandingPage(container, onLoginClick) {
  container.innerHTML = `
    <div class="landing-page">
      <!-- Sticky Header -->
      <header class="landing-header">
        <div class="landing-header-inner">
          <div class="landing-logo">
            <span class="landing-logo-icon">🌾</span>
            <div>
              <div class="landing-logo-title">AgriML</div>
              <div class="landing-logo-sub">Intelligent Agricultural Decision Support</div>
            </div>
          </div>
          <nav class="landing-nav">
            <a href="#overview" class="landing-nav-link">Overview</a>
            <a href="#regions" class="landing-nav-link">Regions</a>
            <a href="#crops" class="landing-nav-link">Crops</a>
            <a href="#soils" class="landing-nav-link">Soils</a>
            <a href="#market" class="landing-nav-link">Market Rates</a>
            <button class="landing-auth-btn" id="landing-login-btn">Login / Sign Up</button>
          </nav>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="landing-hero" style="background-image: url('/images/hero-field.png')">
        <div class="landing-hero-overlay"></div>
        <div class="landing-hero-content">
          <h1 class="landing-hero-title">Smart Farming Starts Here</h1>
          <p class="landing-hero-desc">
            AI-powered fertilizer recommendations, yield optimization, and soil health tracking
            for Indian farmers. Maximize your harvest while protecting your land.
          </p>
          <div class="landing-hero-actions">
            <button class="landing-cta-btn" id="hero-get-started">🚀 Get Started Free</button>
            <a href="#overview" class="landing-cta-secondary">Learn More ↓</a>
          </div>
        </div>
      </section>

      <!-- Stats Bar -->
      <section class="landing-stats">
        <div class="landing-stats-inner">
          <div class="landing-stat">
            <span class="stat-number">142M</span>
            <span class="stat-label">Hectares Farmland</span>
          </div>
          <div class="landing-stat">
            <span class="stat-number">15</span>
            <span class="stat-label">Agro-Climatic Zones</span>
          </div>
          <div class="landing-stat">
            <span class="stat-number">200+</span>
            <span class="stat-label">Crop Varieties</span>
          </div>
          <div class="landing-stat">
            <span class="stat-number">28</span>
            <span class="stat-label">States Covered</span>
          </div>
          <div class="landing-stat">
            <span class="stat-number">8</span>
            <span class="stat-label">Soil Types Analyzed</span>
          </div>
        </div>
      </section>

      <!-- Agriculture Overview -->
      <section class="landing-section" id="overview">
        <div class="landing-section-inner">
          <h2 class="section-heading">🌾 Indian Agriculture at a Glance</h2>
          <p class="section-intro">India is the world's second-largest agricultural producer, feeding 1.4 billion people. Agriculture contributes ~18% to GDP and employs over 42% of the workforce.</p>
          <div class="info-grid">
            <div class="info-card">
              <div class="info-icon">🏞️</div>
              <h3>Cultivation Land</h3>
              <p>India has 142 million hectares of net sown area — the second-largest in the world. From the alluvial plains of the Ganges to the terraced hills of the Northeast, Indian farmland is incredibly diverse.</p>
            </div>
            <div class="info-card">
              <div class="info-icon">💧</div>
              <h3>Irrigation</h3>
              <p>About 52% of farmland is irrigated through canals, tubewells, and drip systems. The remaining 48% depends on monsoon rainfall, making climate-aware farming crucial.</p>
            </div>
            <div class="info-card">
              <div class="info-icon">👨‍🌾</div>
              <h3>Farmers</h3>
              <p>Over 146 million farming households across India. 86% are small and marginal farmers with less than 2 hectares — they are the backbone of Indian food security.</p>
            </div>
            <div class="info-card">
              <div class="info-icon">📈</div>
              <h3>Productivity</h3>
              <p>India produces 310+ million tonnes of foodgrains annually. With precision agriculture and smart fertilizer usage, yields can be boosted by 15-25% sustainably.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Agro-Climatic Regions -->
      <section class="landing-section landing-section-alt" id="regions">
        <div class="landing-section-inner">
          <h2 class="section-heading">🗺️ Agro-Climatic Regions of India</h2>
          <p class="section-intro">India is divided into 15 agro-climatic zones based on rainfall, temperature, and soil type — each with unique farming potential.</p>
          <div class="region-grid">
            ${renderRegions()}
          </div>
        </div>
      </section>

      <!-- Major Crops & Seasons -->
      <section class="landing-section" id="crops">
        <div class="landing-section-inner">
          <h2 class="section-heading">🌱 Major Crops & Growing Seasons</h2>
          <p class="section-intro">India's agricultural calendar is divided into three primary seasons, each suited to specific crops.</p>
          <div class="season-grid">
            <div class="season-card season-kharif">
              <div class="season-header">☔ Kharif Season</div>
              <div class="season-period">June – October (Monsoon)</div>
              <div class="season-crops">
                <span class="season-chip">Rice</span><span class="season-chip">Maize</span>
                <span class="season-chip">Cotton</span><span class="season-chip">Sugarcane</span>
                <span class="season-chip">Soybean</span><span class="season-chip">Groundnut</span>
                <span class="season-chip">Bajra</span><span class="season-chip">Jowar</span>
                <span class="season-chip">Jute</span><span class="season-chip">Turmeric</span>
              </div>
              <p class="season-note">Sown at the start of monsoon, harvested by October. Depends heavily on rainfall patterns.</p>
            </div>
            <div class="season-card season-rabi">
              <div class="season-header">❄️ Rabi Season</div>
              <div class="season-period">October – March (Winter)</div>
              <div class="season-crops">
                <span class="season-chip">Wheat</span><span class="season-chip">Barley</span>
                <span class="season-chip">Mustard</span><span class="season-chip">Gram</span>
                <span class="season-chip">Peas</span><span class="season-chip">Linseed</span>
                <span class="season-chip">Potato</span><span class="season-chip">Onion</span>
                <span class="season-chip">Coriander</span><span class="season-chip">Oats</span>
              </div>
              <p class="season-note">Sown after monsoon, harvested in spring. Requires cool temperatures and irrigation.</p>
            </div>
            <div class="season-card season-zaid">
              <div class="season-header">☀️ Zaid Season</div>
              <div class="season-period">March – June (Summer)</div>
              <div class="season-crops">
                <span class="season-chip">Watermelon</span><span class="season-chip">Muskmelon</span>
                <span class="season-chip">Cucumber</span><span class="season-chip">Moong</span>
                <span class="season-chip">Vegetables</span><span class="season-chip">Fodder</span>
              </div>
              <p class="season-note">Short-duration crops grown between Rabi and Kharif. Needs intensive irrigation.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Indian Soils -->
      <section class="landing-section landing-section-alt" id="soils">
        <div class="landing-section-inner">
          <h2 class="section-heading">🪨 Soils of India</h2>
          <p class="section-intro">India has 8 major soil types, each with distinct fertility, water retention, and crop suitability characteristics.</p>
          <div class="soil-grid">
            ${renderSoilCards()}
          </div>
        </div>
      </section>

      <!-- Market Rates & MSP -->
      <section class="landing-section" id="market">
        <div class="landing-section-inner">
          <h2 class="section-heading">📊 Current Market & MSP Rates (2025-26)</h2>
          <p class="section-intro">Minimum Support Prices (MSP) set by the Government of India to protect farmer incomes.</p>
          <div class="market-table-wrap">
            <table class="market-table">
              <thead>
                <tr><th>Crop</th><th>Season</th><th>MSP (₹/quintal)</th><th>Market Range</th><th>Trend</th></tr>
              </thead>
              <tbody>
                <tr><td>🌾 Paddy (Rice)</td><td>Kharif</td><td>₹2,300</td><td>₹2,200 – ₹3,100</td><td class="trend-up">↑ +5%</td></tr>
                <tr><td>🌾 Wheat</td><td>Rabi</td><td>₹2,275</td><td>₹2,100 – ₹2,800</td><td class="trend-up">↑ +4%</td></tr>
                <tr><td>🌽 Maize</td><td>Kharif</td><td>₹2,090</td><td>₹1,900 – ₹2,500</td><td class="trend-up">↑ +3%</td></tr>
                <tr><td>🫘 Moong Dal</td><td>Kharif</td><td>₹8,558</td><td>₹7,800 – ₹10,200</td><td class="trend-up">↑ +7%</td></tr>
                <tr><td>🥜 Groundnut</td><td>Kharif</td><td>₹6,377</td><td>₹5,900 – ₹7,500</td><td class="trend-up">↑ +4%</td></tr>
                <tr><td>🌸 Mustard</td><td>Rabi</td><td>₹5,650</td><td>₹5,200 – ₹6,800</td><td class="trend-stable">→ +1%</td></tr>
                <tr><td>☁️ Cotton</td><td>Kharif</td><td>₹7,121</td><td>₹6,500 – ₹8,200</td><td class="trend-up">↑ +6%</td></tr>
                <tr><td>🍬 Sugarcane</td><td>Annual</td><td>₹315/qtl</td><td>₹290 – ₹380</td><td class="trend-stable">→ +2%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Climate & Monsoon -->
      <section class="landing-section landing-section-alt" id="climate">
        <div class="landing-section-inner">
          <h2 class="section-heading">☁️ Climate & Monsoon Patterns</h2>
          <p class="section-intro">India's agriculture is deeply connected to its monsoon climate. Understanding rainfall and temperature is key to successful farming.</p>
          <div class="climate-grid">
            <div class="climate-card">
              <div class="climate-icon">🌧️</div>
              <h3>Southwest Monsoon</h3>
              <p>June to September — brings 70-90% of annual rainfall. Critical for Kharif crops. Arrives first in Kerala (June 1) and covers all of India by July 15.</p>
            </div>
            <div class="climate-card">
              <div class="climate-icon">🌊</div>
              <h3>Northeast Monsoon</h3>
              <p>October to December — brings rainfall to Tamil Nadu, Andhra Pradesh, and Karnataka's east coast. Crucial for Rabi rice cultivation in the south.</p>
            </div>
            <div class="climate-card">
              <div class="climate-icon">🌡️</div>
              <h3>Temperature Zones</h3>
              <p>Ranges from -20°C in Ladakh to 50°C in Rajasthan. Most crops need 15-35°C. Frost risk in North India (Dec-Feb) affects Rabi crops.</p>
            </div>
            <div class="climate-card">
              <div class="climate-icon">💨</div>
              <h3>Annual Rainfall</h3>
              <p>Average: 1,170mm. Cherrapunji receives 11,777mm while Jaisalmer gets only 164mm. Understanding local rainfall is essential for crop planning.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="landing-cta-section">
        <div class="landing-cta-inner">
          <h2>Ready to Optimize Your Farm?</h2>
          <p>Get AI-powered fertilizer recommendations, yield predictions, and soil health insights — all personalized for your region.</p>
          <button class="landing-cta-btn landing-cta-large" id="cta-get-started">🌾 Start Analyzing Free</button>
        </div>
      </section>

      <!-- Footer -->
      <footer class="landing-footer">
        <div class="landing-footer-inner">
          <div class="footer-brand">
            <span>🌾 AgriML</span>
            <p>Intelligent Agricultural Decision Support System</p>
          </div>
          <div class="footer-links">
            <span>Built with ❤️ for Indian Farmers</span>
            <span>•</span>
            <span>ML-Powered • Client-Side • Zero Data Collection</span>
          </div>
        </div>
      </footer>
    </div>
  `;

  // Wire events
  const loginBtn = container.querySelector('#landing-login-btn');
  const heroBtn = container.querySelector('#hero-get-started');
  const ctaBtn = container.querySelector('#cta-get-started');

  [loginBtn, heroBtn, ctaBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', onLoginClick);
  });

  // Smooth scroll for nav links
  container.querySelectorAll('.landing-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

function renderRegions() {
  const regions = [
    { name: "Western Himalayan", states: "J&K, HP, Uttarakhand", crops: "Apple, Wheat, Barley, Potato", climate: "Cold, 1000-2000mm rain" },
    { name: "Eastern Himalayan", states: "Sikkim, NE states", crops: "Tea, Rice, Cardamom, Orange", climate: "Humid, 2000-4000mm rain" },
    { name: "Lower Gangetic Plains", states: "West Bengal", crops: "Rice, Jute, Tea, Potato", climate: "Humid, 1200-1500mm rain" },
    { name: "Middle Gangetic Plains", states: "UP (east), Bihar", crops: "Rice, Wheat, Sugarcane, Litchi", climate: "Sub-humid, 1000-1200mm" },
    { name: "Upper Gangetic Plains", states: "UP (west), Uttarakhand", crops: "Wheat, Sugarcane, Rice, Mustard", climate: "Semi-arid, 700-1000mm" },
    { name: "Trans-Gangetic Plains", states: "Punjab, Haryana, Delhi", crops: "Wheat, Rice, Cotton, Mustard", climate: "Semi-arid, 500-800mm" },
    { name: "Eastern Plateau & Hills", states: "Odisha, Jharkhand, Chhattisgarh", crops: "Rice, Millets, Pulses, Oilseeds", climate: "Sub-humid, 1000-1600mm" },
    { name: "Central Plateau & Hills", states: "MP, Rajasthan, UP (Bundelkhand)", crops: "Soybean, Wheat, Gram, Cotton", climate: "Semi-arid, 700-1300mm" },
    { name: "Western Plateau & Hills", states: "Maharashtra (inland)", crops: "Cotton, Jowar, Sugarcane, Soybeans", climate: "Semi-arid, 600-1000mm" },
    { name: "Southern Plateau & Hills", states: "Karnataka, AP, Telangana", crops: "Rice, Ragi, Groundnut, Sunflower", climate: "Semi-arid, 600-1000mm" },
    { name: "East Coast Plains", states: "TN, AP, Odisha coast", crops: "Rice, Coconut, Cashew, Banana", climate: "Humid, 800-1400mm" },
    { name: "West Coast Plains & Ghats", states: "Kerala, Goa, KA coast", crops: "Coconut, Rice, Spices, Rubber", climate: "Very humid, 2000-4000mm" },
    { name: "Gujarat Plains & Hills", states: "Gujarat", crops: "Cotton, Groundnut, Wheat, Cumin", climate: "Arid to semi-arid, 400-1000mm" },
    { name: "Western Dry Region", states: "Rajasthan (Thar)", crops: "Bajra, Guar, Moth Bean, Dates", climate: "Arid, <400mm rain" },
    { name: "Island Region", states: "Andaman & Nicobar, Lakshadweep", crops: "Coconut, Rice, Arecanut, Spices", climate: "Tropical, 1800-3000mm" },
  ];

  return regions.map(r => `
    <div class="region-card">
      <div class="region-name">${r.name}</div>
      <div class="region-states">📍 ${r.states}</div>
      <div class="region-crops">🌱 ${r.crops}</div>
      <div class="region-climate">🌤️ ${r.climate}</div>
    </div>
  `).join('');
}

function renderSoilCards() {
  const soils = [
    { name: "Alluvial Soil", emoji: "🌾", color: "#c8a96e", where: "Indo-Gangetic Plains", crops: "Wheat, Rice, Sugarcane, Cotton", note: "Most fertile & widespread" },
    { name: "Black / Regur Soil", emoji: "⬛", color: "#3a3a3a", where: "Deccan Plateau", crops: "Cotton, Soybean, Sorghum, Wheat", note: "Self-ploughing, high moisture" },
    { name: "Red & Yellow Soil", emoji: "🟥", color: "#c0392b", where: "Odisha, Jharkhand, TN", crops: "Groundnut, Millets, Tobacco, Rice", note: "Iron-rich, needs lime" },
    { name: "Laterite Soil", emoji: "🧱", color: "#e67e22", where: "Kerala, Karnataka, NE", crops: "Tea, Coffee, Rubber, Coconut", note: "Leached, acidic" },
    { name: "Arid/Desert Soil", emoji: "🏜️", color: "#f4d03f", where: "Rajasthan, Kutch", crops: "Bajra, Guar, Dates, Sesame", note: "Sandy, very low water" },
    { name: "Saline/Alkaline", emoji: "🧂", color: "#95a5a6", where: "Coastal, Punjab", crops: "Rice, Barley, Salt-tolerant crops", note: "Needs drainage & gypsum" },
    { name: "Peaty/Marshy", emoji: "🌿", color: "#1a5276", where: "Kerala, Odisha coast", crops: "Rice, Jute, Coconut", note: "Waterlogged, highly acidic" },
    { name: "Forest/Mountain", emoji: "🏔️", color: "#27ae60", where: "Himalayan states", crops: "Apple, Tea, Potato, Ginger", note: "Rich in humus" },
  ];

  return soils.map(s => `
    <div class="soil-land-card" style="border-top: 3px solid ${s.color}">
      <div class="soil-land-header">${s.emoji} ${s.name}</div>
      <div class="soil-land-where">📍 ${s.where}</div>
      <div class="soil-land-crops">🌱 ${s.crops}</div>
      <div class="soil-land-note">${s.note}</div>
    </div>
  `).join('');
}
