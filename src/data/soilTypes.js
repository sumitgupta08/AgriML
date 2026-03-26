// Indian Soil Types — Classification, Properties & Crop Suitability

export const SOIL_TYPES = {
  "alluvial": {
    name: "Alluvial Soil", emoji: "🌾", color: "#c8a96e",
    regions: "Indo-Gangetic Plains (UP, Bihar, Punjab, Haryana, WB, Assam)",
    ph: "6.5 – 8.4", waterRetention: "High", texture: "Sandy loam to clay loam",
    nutrients: "Rich in Potash & Lime; deficient in N & P",
    description: "Most fertile and widespread soil in India. Formed by river sediment deposits along the great northern plains.",
    bestCrops: ["Wheat","Rice","Maize","Sugarcane","Cotton","Jute","Oilseeds","Pulses","Vegetables","Mustard"],
    avoidCrops: ["Cassava","Pineapple"],
    tips: "Responds well to nitrogen-based fertilizers. Maintain organic matter with compost or green manure."
  },
  "black": {
    name: "Black / Regur Soil", emoji: "⬛", color: "#3a3a3a",
    regions: "Deccan Plateau (Maharashtra, Gujarat, MP, AP, Telangana, Karnataka)",
    ph: "7.2 – 8.5", waterRetention: "Very High (swells when wet, cracks when dry)", texture: "Fine clay",
    nutrients: "Rich in Ca, Mg, Fe, Al; low in N, P, Humus",
    description: "Known as Regur or cotton soil. Self-ploughing nature due to swelling when wet. Retains moisture for long periods.",
    bestCrops: ["Cotton","Soybean","Sorghum","Wheat","Linseed","Groundnut","Tobacco","Chillies","Pulses","Citrus"],
    avoidCrops: ["Rice","Jute"],
    tips: "Avoid over-irrigation. Mulching prevents cracking. Add phosphorus supplements for better yield."
  },
  "red_yellow": {
    name: "Red & Yellow Soil", emoji: "🟥", color: "#c0392b",
    regions: "Odisha, Jharkhand, Tamil Nadu, Karnataka, Eastern MP",
    ph: "5.5 – 7.5", waterRetention: "Low to Moderate", texture: "Sandy to loamy",
    nutrients: "Deficient in N, P, K, Ca; low organic matter",
    description: "Red color due to iron oxides. Less fertile but improves significantly with organic inputs and lime.",
    bestCrops: ["Groundnut","Millets","Tobacco","Rice","Wheat","Pulses","Potato","Oilseeds","Vegetables","Ragi"],
    avoidCrops: ["Cotton","Jute","Sugarcane"],
    tips: "Add lime to correct acidity. Heavy applications of compost & NPK improve fertility significantly."
  },
  "laterite": {
    name: "Laterite Soil", emoji: "🧱", color: "#e67e22",
    regions: "Kerala, Karnataka, Goa, Odisha, Northeast India",
    ph: "5.0 – 6.0", waterRetention: "Low (porous, leaches easily)", texture: "Coarse, porous",
    nutrients: "Very low N, P, K; rich in iron & aluminium oxides",
    description: "Formed in tropical high-rainfall areas. Heavily leached by rainfall. Ideal for plantation crops.",
    bestCrops: ["Tea","Coffee","Rubber","Coconut","Cashew","Pepper","Tapioca","Arecanut","Pineapple"],
    avoidCrops: ["Wheat","Sugarcane"],
    tips: "Requires heavy manuring and liming. Drip irrigation is ideal to prevent nutrient leaching."
  },
  "arid_desert": {
    name: "Arid / Desert Soil", emoji: "🏜️", color: "#f4d03f",
    regions: "Rajasthan, Kutch-Gujarat, SW Haryana, SW Punjab",
    ph: "7.5 – 8.5", waterRetention: "Very Low", texture: "Sandy, coarse",
    nutrients: "Low N & Humus; Nitrates & Phosphates present naturally",
    description: "Sandy, dry with low organic matter. Subject to wind erosion. Soluble salts present in sub-soil.",
    bestCrops: ["Bajra","Jowar","Barley","Moth Bean","Guar","Sesame","Cluster Bean","Pomegranate","Dates","Ber"],
    avoidCrops: ["Rice","Jute","Tea","Coffee","Sugarcane"],
    tips: "Use drip irrigation. Wind-break trees are essential. Gypsum application helps manage soluble salts."
  },
  "saline_alkaline": {
    name: "Saline / Alkaline Soil", emoji: "🧂", color: "#95a5a6",
    regions: "Coastal regions, Punjab (Kolar), UP, Bihar, Rajasthan",
    ph: "8.5 – 10.0", waterRetention: "Variable", texture: "Variable, often clayey",
    nutrients: "High Na, Mg, Ca salts; low N & Ca availability",
    description: "Also called Reh or Thur. Poor productivity due to salt toxicity. Common in water-logged or poorly drained areas.",
    bestCrops: ["Rice","Barley","Cotton","Wheat (tolerant varieties)","Sugarbeet","Halophyte species"],
    avoidCrops: ["Most vegetables","Fruits","Groundnut"],
    tips: "Gypsum/lime application helps. Proper drainage is essential. Leaching with excess irrigation water reduces salt."
  },
  "peaty_marshy": {
    name: "Peaty / Marshy Soil", emoji: "🌿", color: "#1a5276",
    regions: "Kerala (Kuttanad), Odisha coast, West Bengal, Uttarakhand",
    ph: "3.5 – 5.5", waterRetention: "Very High", texture: "Fine, heavy with organic matter",
    nutrients: "High organic content; low N, P availability; may contain toxic elements",
    description: "Waterlogged areas rich in decaying organic matter. Highly acidic. Found in marshes and backwaters.",
    bestCrops: ["Rice","Jute","Vegetables (after drainage)","Coconut","Arrowroot","Water Chestnut"],
    avoidCrops: ["Wheat","Cotton","Groundnut"],
    tips: "Requires good drainage before cultivation. Lime application reduces acidity. Avoid flooding non-aquatic crops."
  },
  "forest_mountain": {
    name: "Forest / Mountain Soil", emoji: "🏔️", color: "#27ae60",
    regions: "Himalayan states (HP, Uttarakhand, J&K, Sikkim, Northeast)",
    ph: "5.0 – 6.5", waterRetention: "Moderate to High", texture: "Loamy to clay-loamy",
    nutrients: "Rich in humus; variable N, P, K; low lime",
    description: "Found on mountain slopes. Highly varied by altitude and vegetation. Rich in organic matter in upper layers.",
    bestCrops: ["Apple","Pear","Plum","Apricot","Tea","Cardamom","Potato","Ginger","Wheat","Barley","Maize"],
    avoidCrops: ["Cotton","Sugarcane","Groundnut"],
    tips: "Contour farming prevents erosion. Terracing on slopes. Organic farming performs best in this soil."
  }
};
