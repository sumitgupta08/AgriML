// Knowledge Base — Educational content about fertilizers, soil nutrients, and best practices

export const KNOWLEDGE_DATA = {
    fertilizers: [
        {
            name: 'Urea',
            formula: 'CO(NH₂)₂',
            nutrientContent: 'N: 46%',
            icon: '🧪',
            color: '#34d399',
            description: 'The most widely used nitrogen fertilizer in the world. It provides the highest nitrogen content of any solid fertilizer.',
            bestFor: ['Rice', 'Wheat', 'Maize', 'Sugarcane'],
            application: 'Apply in split doses — 50% at sowing and 50% at tillering stage. Avoid surface application during hot weather as nitrogen can volatilize.',
            advantages: ['Highest N content (46%)', 'Affordable and widely available', 'Suitable for most crops and soils', 'Can be applied as foliar spray'],
            precautions: ['Do not apply on wet foliage', 'Can cause soil acidification over time', 'Loses nitrogen through volatilization in alkaline soils']
        },
        {
            name: 'DAP (Di-Ammonium Phosphate)',
            formula: '(NH₄)₂HPO₄',
            nutrientContent: 'N: 18%, P₂O₅: 46%',
            icon: '🔬',
            color: '#60a5fa',
            description: 'A highly concentrated phosphorus fertilizer that also provides nitrogen. It is the world\'s most widely used phosphorus fertilizer.',
            bestFor: ['Wheat', 'Pulses', 'Oilseeds', 'Vegetables'],
            application: 'Apply as a basal dose before sowing. Place 5-10 cm below the seed for maximum phosphorus uptake.',
            advantages: ['High phosphorus content', 'Also provides nitrogen', 'Good for root development', 'Improves flowering and fruit setting'],
            precautions: ['Not suitable for alkaline soils (pH > 7.5)', 'Can reduce phosphorus availability in calcareous soils', 'Avoid mixing with calcium-based fertilizers']
        },
        {
            name: 'NPK 20-20-20',
            formula: 'Complex blend',
            nutrientContent: 'N: 20%, P₂O₅: 20%, K₂O: 20%',
            icon: '⚗️',
            color: '#fbbf24',
            description: 'A balanced complex fertilizer providing equal proportions of all three major nutrients. Ideal for general-purpose nutrition.',
            bestFor: ['Vegetables', 'Fruits', 'Flowers', 'All crops'],
            application: 'Apply as basal or top dressing. Suitable for fertigation in drip irrigation systems.',
            advantages: ['Balanced nutrition in one application', 'Reduces number of separate applications', 'Suitable for most crops', 'Good for initial growth stages'],
            precautions: ['May not suit crops needing specific nutrient ratios', 'More expensive per nutrient unit than single fertilizers']
        },
        {
            name: 'MOP (Muriate of Potash)',
            formula: 'KCl',
            nutrientContent: 'K₂O: 60%',
            icon: '🧂',
            color: '#a78bfa',
            description: 'The most common potassium fertilizer. Essential for water regulation, disease resistance, and quality of fruits and grains.',
            bestFor: ['Banana', 'Potato', 'Coconut', 'Sugarcane'],
            application: 'Apply as basal dose. For fruit trees, apply in a ring 30-50 cm from the trunk. Avoid direct contact with seeds.',
            advantages: ['Highest potassium content (60%)', 'Improves drought tolerance', 'Enhances fruit quality and shelf life', 'Strengthens plant stems'],
            precautions: ['Contains chloride — not suitable for tobacco, grapes, potatoes (in excess)', 'Can increase soil salinity', 'Avoid in saline soils']
        },
        {
            name: 'SSP (Single Super Phosphate)',
            formula: 'Ca(H₂PO₄)₂ + CaSO₄',
            nutrientContent: 'P₂O₅: 16%, S: 11%, Ca: 19%',
            icon: '💊',
            color: '#f472b6',
            description: 'Provides phosphorus along with calcium and sulfur. An excellent multi-nutrient fertilizer for sulfur-deficient soils.',
            bestFor: ['Groundnut', 'Mustard', 'Pulses', 'Oilseeds'],
            application: 'Apply as full basal dose at sowing time. Mix well with soil. Can be used in acidic to neutral soils.',
            advantages: ['Provides P, Ca, and S together', 'Affordable for small farmers', 'Improves soil structure via calcium', 'Good for oilseed crops'],
            precautions: ['Lower P content than DAP', 'Bulky — requires more quantity per hectare', 'Can cake in humid storage']
        },
        {
            name: 'Ammonium Sulphate',
            formula: '(NH₄)₂SO₄',
            nutrientContent: 'N: 21%, S: 24%',
            icon: '⚡',
            color: '#fb923c',
            description: 'A nitrogen fertilizer that also provides sulfur. Particularly valuable for sulfur-deficient soils and crops that need sulfur.',
            bestFor: ['Tea', 'Rice', 'Sugarcane', 'Cruciferous vegetables'],
            application: 'Apply as top dressing during active growth. Can be mixed with other fertilizers. Suitable for alkaline soils.',
            advantages: ['Provides both N and S', 'Does not volatilize easily', 'Good for alkaline soils', 'Lowers soil pH gradually'],
            precautions: ['Lower N content than urea', 'Continuous use can make soil too acidic', 'Not recommended for already acidic soils']
        }
    ],

    nutrients: [
        {
            name: 'Nitrogen (N)',
            icon: '💚',
            color: '#34d399',
            role: 'The Engine of Growth',
            importance: 'Essential for leaf growth, chlorophyll production, and protein synthesis. It is the most critical nutrient for vegetative growth.',
            deficiencySymptoms: ['Yellowing of older leaves (chlorosis)', 'Stunted growth', 'Reduced tillering in cereals', 'Pale green plant color'],
            excessSymptoms: ['Excessive vegetative growth', 'Delayed maturity', 'Weak stems (lodging)', 'Increased pest susceptibility'],
            naturalSources: ['Legume cover crops (fix atmospheric N)', 'Farmyard manure', 'Compost', 'Green manuring'],
            optimalRange: '40–120 kg/ha (varies by crop)'
        },
        {
            name: 'Phosphorus (P)',
            icon: '🔵',
            color: '#60a5fa',
            role: 'The Root Builder',
            importance: 'Critical for root development, energy transfer (ATP), flowering, and seed formation. Essential during early growth stages.',
            deficiencySymptoms: ['Purple/reddish discoloration of leaves', 'Poor root development', 'Delayed maturity', 'Reduced seed/grain filling'],
            excessSymptoms: ['Zinc and iron deficiency (lockout)', 'Environmental runoff risk', 'Algal bloom in water bodies'],
            naturalSources: ['Bone meal', 'Rock phosphate', 'Compost', 'Vermicompost'],
            optimalRange: '20–60 kg/ha'
        },
        {
            name: 'Potassium (K)',
            icon: '🟡',
            color: '#fbbf24',
            role: 'The Quality Enhancer',
            importance: 'Regulates water uptake, enzyme activation, and photosynthesis. Improves disease resistance, drought tolerance, and crop quality.',
            deficiencySymptoms: ['Scorching/browning of leaf edges', 'Weak stems (lodging)', 'Small and shriveled fruits', 'Poor drought resistance'],
            excessSymptoms: ['Magnesium and calcium lockout', 'Salt stress in roots', 'Reduced fruit quality'],
            naturalSources: ['Wood ash', 'Banana peels (compost)', 'Seaweed extract', 'Greensand'],
            optimalRange: '20–80 kg/ha'
        },
        {
            name: 'Soil pH',
            icon: '⚗️',
            color: '#a78bfa',
            role: 'The Nutrient Gatekeeper',
            importance: 'pH controls nutrient availability. Most nutrients are maximally available between pH 6.0–7.0. Extreme pH locks out essential nutrients.',
            deficiencySymptoms: ['(Low pH / Acidic) Aluminum toxicity, poor microbial activity', '(High pH / Alkaline) Iron, zinc, and manganese lockout'],
            excessSymptoms: ['No excess — it is a scale measure'],
            naturalSources: ['Lime (to raise pH)', 'Sulfur or gypsum (to lower pH)', 'Organic matter (buffers pH)'],
            optimalRange: '6.0–7.5 for most crops'
        },
        {
            name: 'Organic Matter',
            icon: '🌱',
            color: '#059669',
            role: 'The Soil Life Foundation',
            importance: 'Improves soil structure, water retention, nutrient cycling, and microbial diversity. The foundation of healthy soil.',
            deficiencySymptoms: ['Poor water retention', 'Compacted soil', 'Low nutrient availability', 'Reduced microbial life'],
            excessSymptoms: ['Nitrogen immobilization (temporary)', 'Waterlogging in heavy soils'],
            naturalSources: ['Cover cropping', 'Composting', 'Green manuring', 'Mulching', 'Crop residue incorporation'],
            optimalRange: '2–5% soil organic matter'
        },
        {
            name: 'Sulfur (S)',
            icon: '🟠',
            color: '#fb923c',
            role: 'The Protein Partner',
            importance: 'Essential for amino acid synthesis (cysteine, methionine), chlorophyll formation, and nitrogen metabolism. Often called the "4th macronutrient."',
            deficiencySymptoms: ['Yellowing of young leaves (unlike N)', 'Stunted growth', 'Reduced oil content in oilseeds', 'Poor nodulation in legumes'],
            excessSymptoms: ['Leaf burn at very high levels', 'Soil acidification'],
            naturalSources: ['Gypsum', 'Ammonium sulphate', 'Elemental sulfur', 'Organic matter'],
            optimalRange: '10–40 kg/ha'
        }
    ],

    bestPractices: [
        { icon: '🔬', title: 'Soil Testing First', text: 'Always test your soil before applying fertilizers. This prevents over-application and saves money.' },
        { icon: '📅', title: 'Right Time', text: 'Apply fertilizers at the right growth stage. Nitrogen at tillering, phosphorus at sowing, potassium before flowering.' },
        { icon: '💧', title: 'Moisture Matters', text: 'Apply fertilizers when soil is moist but not waterlogged. Moisture helps nutrient dissolution and root uptake.' },
        { icon: '🌡️', title: 'Avoid Extreme Heat', text: 'Do not apply fertilizers during peak heat (>38°C). Nitrogen volatilization increases dramatically in hot weather.' },
        { icon: '✂️', title: 'Split Application', text: 'Split nitrogen into 2-3 doses rather than one. This improves efficiency and reduces environmental losses.' },
        { icon: '🔄', title: 'Crop Rotation', text: 'Rotate crops to naturally restore soil nutrients. Follow a cereal with a legume to fix atmospheric nitrogen.' },
        { icon: '🌿', title: 'Integrated Nutrition', text: 'Combine chemical fertilizers with organic sources (FYM, compost) for sustainable long-term soil health.' },
        { icon: '📏', title: 'Placement Depth', text: 'Place fertilizers 5-10 cm below the soil surface for better uptake and reduced surface runoff.' }
    ]
};

export function renderKnowledgePanel() {
    const data = KNOWLEDGE_DATA;

    return `
    <div class="knowledge-section">
      <!-- Sub-tabs for knowledge sections -->
      <div class="knowledge-tabs">
        <button class="knowledge-tab active" data-ktab="fertilizers">🧪 Fertilizers</button>
        <button class="knowledge-tab" data-ktab="nutrients">🌱 Soil Nutrients</button>
        <button class="knowledge-tab" data-ktab="practices">📚 Best Practices</button>
      </div>

      <!-- Fertilizers Section -->
      <div class="knowledge-content active" id="kcontent-fertilizers">
        <div class="knowledge-intro card">
          <div class="card-title"><span class="card-title-icon">📖</span> Understanding Fertilizers</div>
          <p class="knowledge-intro-text">Fertilizers provide essential nutrients that soil may lack. Understanding what each fertilizer does helps you make smarter, cost-effective, and eco-friendly choices for your farm.</p>
        </div>
        <div class="fertilizer-cards">
          ${data.fertilizers.map(f => renderFertilizerCard(f)).join('')}
        </div>
      </div>

      <!-- Nutrients Section -->
      <div class="knowledge-content" id="kcontent-nutrients">
        <div class="knowledge-intro card">
          <div class="card-title"><span class="card-title-icon">🔬</span> Essential Soil Nutrients</div>
          <p class="knowledge-intro-text">Plants need 17 essential nutrients to grow. The three primary macronutrients — Nitrogen, Phosphorus, and Potassium (NPK) — are needed in the largest quantities. Here's what each one does and how to manage them.</p>
        </div>
        <div class="nutrient-cards">
          ${data.nutrients.map(n => renderNutrientCard(n)).join('')}
        </div>
      </div>

      <!-- Best Practices Section -->
      <div class="knowledge-content" id="kcontent-practices">
        <div class="knowledge-intro card">
          <div class="card-title"><span class="card-title-icon">🌾</span> Fertilizer Best Practices</div>
          <p class="knowledge-intro-text">Follow these proven practices to maximize fertilizer efficiency, reduce costs, and protect the environment.</p>
        </div>
        <div class="practices-grid">
          ${data.bestPractices.map(p => `
            <div class="practice-card card">
              <div class="practice-icon">${p.icon}</div>
              <div class="practice-title">${p.title}</div>
              <div class="practice-text">${p.text}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderFertilizerCard(f) {
    return `
    <div class="fert-knowledge-card card">
      <div class="fert-k-header">
        <div class="fert-k-icon" style="background:${f.color}20;color:${f.color}">${f.icon}</div>
        <div>
          <div class="fert-k-name">${f.name}</div>
          <div class="fert-k-formula">${f.formula} — ${f.nutrientContent}</div>
        </div>
      </div>
      <p class="fert-k-desc">${f.description}</p>
      <div class="fert-k-tags">
        <span class="fert-k-tag-label">Best for:</span>
        ${f.bestFor.map(c => `<span class="fert-k-tag">${c}</span>`).join('')}
      </div>
      <details class="fert-k-details">
        <summary class="fert-k-summary">📋 Application & Details</summary>
        <div class="fert-k-details-body">
          <div class="fert-k-section">
            <div class="fert-k-section-title">How to Apply</div>
            <p>${f.application}</p>
          </div>
          <div class="fert-k-section">
            <div class="fert-k-section-title">✅ Advantages</div>
            <ul class="fert-k-list">${f.advantages.map(a => `<li>${a}</li>`).join('')}</ul>
          </div>
          <div class="fert-k-section">
            <div class="fert-k-section-title">⚠️ Precautions</div>
            <ul class="fert-k-list fert-k-list-warn">${f.precautions.map(p => `<li>${p}</li>`).join('')}</ul>
          </div>
        </div>
      </details>
    </div>
  `;
}

function renderNutrientCard(n) {
    return `
    <div class="nutrient-knowledge-card card">
      <div class="nutrient-k-header">
        <div class="nutrient-k-icon" style="background:${n.color}20;color:${n.color}">${n.icon}</div>
        <div>
          <div class="nutrient-k-name">${n.name}</div>
          <div class="nutrient-k-role" style="color:${n.color}">${n.role}</div>
        </div>
      </div>
      <p class="nutrient-k-importance">${n.importance}</p>
      <div class="nutrient-k-range">
        <span class="nutrient-k-range-label">Optimal Range:</span>
        <span class="nutrient-k-range-value" style="color:${n.color}">${n.optimalRange}</span>
      </div>
      <details class="fert-k-details">
        <summary class="fert-k-summary">🔍 Symptoms & Sources</summary>
        <div class="fert-k-details-body">
          <div class="fert-k-section">
            <div class="fert-k-section-title">🔴 Deficiency Signs</div>
            <ul class="fert-k-list fert-k-list-warn">${n.deficiencySymptoms.map(s => `<li>${s}</li>`).join('')}</ul>
          </div>
          ${n.excessSymptoms[0] !== 'No excess — it is a scale measure' ? `
          <div class="fert-k-section">
            <div class="fert-k-section-title">🟡 Excess Signs</div>
            <ul class="fert-k-list">${n.excessSymptoms.map(s => `<li>${s}</li>`).join('')}</ul>
          </div>` : ''}
          <div class="fert-k-section">
            <div class="fert-k-section-title">🌿 Natural Sources</div>
            <ul class="fert-k-list fert-k-list-good">${n.naturalSources.map(s => `<li>${s}</li>`).join('')}</ul>
          </div>
        </div>
      </details>
    </div>
  `;
}

export function wireKnowledgeTabs() {
    const tabs = document.querySelectorAll('.knowledge-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.knowledge-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const content = document.getElementById(`kcontent-${tab.dataset.ktab}`);
            if (content) content.classList.add('active');
        });
    });
}
