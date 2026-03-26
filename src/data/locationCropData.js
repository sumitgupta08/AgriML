// Location-Based Crop Recommendations for Indian States
// Based on agro-climatic zones, traditional farming patterns, and agronomic research

export const LOCATION_CROP_DATA = {
  "Andhra Pradesh":     { primary: ["Rice","Sugarcane","Tobacco","Groundnut"], secondary: ["Maize","Jowar","Bajra","Sesame"], cash: ["Cotton","Chillies","Turmeric"], horticulture: ["Mango","Banana","Papaya","Tomato","Onion"] },
  "Arunachal Pradesh":  { primary: ["Rice","Maize","Millet"], secondary: ["Wheat","Barley","Buckwheat"], cash: ["Cardamom","Ginger","Turmeric"], horticulture: ["Orange","Kiwi","Apple","Pineapple","Passion Fruit"] },
  "Assam":              { primary: ["Rice","Tea","Jute"], secondary: ["Maize","Mustard","Pulses"], cash: ["Sugarcane","Betel Nut"], horticulture: ["Banana","Pineapple","Citrus","Papaya","Jackfruit"] },
  "Bihar":              { primary: ["Rice","Wheat","Maize"], secondary: ["Sugarcane","Jute","Mustard"], cash: ["Tobacco","Potato"], horticulture: ["Mango","Litchi","Banana","Guava","Vegetables"] },
  "Chhattisgarh":       { primary: ["Rice","Maize","Wheat"], secondary: ["Jowar","Bajra","Pulses"], cash: ["Soybean","Groundnut"], horticulture: ["Mango","Guava","Tomato","Brinjal","Chilli"] },
  "Goa":                { primary: ["Rice","Coconut","Cashew"], secondary: ["Banana","Areca Nut"], cash: ["Sugarcane"], horticulture: ["Mango","Papaya","Pineapple","Jack fruit","Vegetables"] },
  "Gujarat":            { primary: ["Cotton","Groundnut","Wheat"], secondary: ["Jowar","Bajra","Sugarcane"], cash: ["Castor","Tobacco","Cumin"], horticulture: ["Mango","Banana","Sapota","Guava","Potato"] },
  "Haryana":            { primary: ["Wheat","Rice","Sugarcane"], secondary: ["Bajra","Cotton","Maize"], cash: ["Oilseeds","Mustard"], horticulture: ["Potato","Tomato","Onion","Pea","Cauliflower"] },
  "Himachal Pradesh":   { primary: ["Wheat","Maize","Rice"], secondary: ["Barley","Oats","Buckwheat"], cash: ["Apple","Potatoes"], horticulture: ["Apple","Pear","Plum","Apricot","Cherry","Mushroom"] },
  "Jharkhand":          { primary: ["Rice","Maize","Wheat"], secondary: ["Pulses","Oilseeds","Potatoes"], cash: ["Lac"], horticulture: ["Mango","Jackfruit","Guava","Litchi","Banana"] },
  "Karnataka":          { primary: ["Rice","Ragi","Jowar"], secondary: ["Sugarcane","Cotton","Sunflower"], cash: ["Coffee","Silk"], horticulture: ["Mango","Grapes","Banana","Tomato","Pomegranate"] },
  "Kerala":             { primary: ["Rice","Coconut","Rubber"], secondary: ["Cassava","Banana","Areca Nut"], cash: ["Tea","Coffee","Spices","Cardamom"], horticulture: ["Pineapple","Jackfruit","Pepper","Nutmeg","Vanilla"] },
  "Madhya Pradesh":     { primary: ["Wheat","Soybean","Rice"], secondary: ["Jowar","Maize","Gram"], cash: ["Cotton","Sugarcane","Groundnut"], horticulture: ["Orange","Tomato","Garlic","Onion","Guava"] },
  "Maharashtra":        { primary: ["Cotton","Sugarcane","Jowar"], secondary: ["Wheat","Rice","Groundnut"], cash: ["Grapes","Pomegranate"], horticulture: ["Banana","Mango","Oranges","Tomato","Onion"] },
  "Manipur":            { primary: ["Rice","Maize","Mustard"], secondary: ["Pulses","Vegetables","Ginger"], cash: ["Sugarcane"], horticulture: ["Pineapple","Orange","Banana","Litchi","King Chilli"] },
  "Meghalaya":          { primary: ["Rice","Maize","Potato"], secondary: ["Ginger","Turmeric","Mustard"], cash: ["Tea","Arecanut"], horticulture: ["Pineapple","Orange","Banana","Jackfruit","Plum"] },
  "Mizoram":            { primary: ["Rice","Maize"], secondary: ["Ginger","Turmeric","Sugarcane"], cash: ["Oil Palms"], horticulture: ["Banana","Pineapple","Passion Fruit","Papaya","Orange"] },
  "Nagaland":           { primary: ["Rice","Maize","Millets"], secondary: ["Wheat","Barley","Buckwheat"], cash: ["Ginger","Turmeric"], horticulture: ["Pineapple","Orange","Banana","Kiwi","Peach"] },
  "Odisha":             { primary: ["Rice","Maize","Pulses"], secondary: ["Groundnut","Mustard","Jute"], cash: ["Sugarcane","Cotton"], horticulture: ["Mango","Coconut","Cashew","Tomato","Ginger"] },
  "Punjab":             { primary: ["Wheat","Rice","Cotton"], secondary: ["Maize","Sugarcane","Barley"], cash: ["Sunflower","Mustard"], horticulture: ["Potato","Pea","Onion","Tomato","Kinnow"] },
  "Rajasthan":          { primary: ["Bajra","Wheat","Mustard"], secondary: ["Jowar","Maize","Groundnut"], cash: ["Cumin","Coriander","Sesame"], horticulture: ["Pomegranate","Aonla","Date Palm","Ber","Guava"] },
  "Sikkim":             { primary: ["Maize","Rice","Cardamom"], secondary: ["Ginger","Turmeric","Wheat"], cash: ["Large Cardamom","Orange"], horticulture: ["Apple","Pear","Plum","Kiwi","Mandarin"] },
  "Tamil Nadu":         { primary: ["Rice","Sugarcane","Cotton"], secondary: ["Maize","Bajra","Groundnut"], cash: ["Banana","Turmeric"], horticulture: ["Mango","Banana","Coconut","Tamarind","Guava"] },
  "Telangana":          { primary: ["Rice","Cotton","Maize"], secondary: ["Soybean","Groundnut","Jowar"], cash: ["Chillies","Turmeric","Tobacco"], horticulture: ["Mango","Papaya","Guava","Tomato","Watermelon"] },
  "Tripura":            { primary: ["Rice","Jute","Oilseeds"], secondary: ["Sugarcane","Wheat","Pulses"], cash: ["Rubber","Tea"], horticulture: ["Pineapple","Banana","Jackfruit","Orange","Papaya"] },
  "Uttar Pradesh":      { primary: ["Wheat","Rice","Sugarcane"], secondary: ["Maize","Barley","Millets"], cash: ["Potato","Mustard","Mentha"], horticulture: ["Mango","Guava","Banana","Amla","Tomato"] },
  "Uttarakhand":        { primary: ["Wheat","Rice","Maize"], secondary: ["Barley","Oilseeds","Potato"], cash: ["Apple","Medicinal Herbs"], horticulture: ["Apple","Pear","Peach","Plum","Apricot","Litchi"] },
  "West Bengal":        { primary: ["Rice","Jute","Tea"], secondary: ["Wheat","Maize","Mustard"], cash: ["Sugarcane","Potato","Tobacco"], horticulture: ["Mango","Banana","Litchi","Pineapple","Vegetables"] },
  // Union Territories
  "Delhi":              { primary: ["Wheat","Rice"], secondary: ["Vegetables","Pulses"], cash: ["Flowers","Herbs"], horticulture: ["Tomato","Leafy Vegetables","Herbs","Mushroom"] },
  "Jammu & Kashmir":    { primary: ["Rice","Wheat","Maize"], secondary: ["Barley","Oilseeds","Pulses"], cash: ["Saffron","Walnut"], horticulture: ["Apple","Pear","Cherry","Apricot","Almond","Strawberry"] },
  "Ladakh":             { primary: ["Barley","Wheat","Buckwheat"], secondary: ["Pea","Potato"], cash: ["Sea Buckthorn","Medicinal Herbs"], horticulture: ["Apricot","Apple","Pea","Leafy Greens"] },
  "Goa":                { primary: ["Rice","Coconut","Cashew"], secondary: ["Areca Nut","Banana"], cash: ["Sugarcane"], horticulture: ["Mango","Jackfruit","Pineapple","Vegetables"] },
  "Chandigarh":         { primary: ["Wheat","Rice"], secondary: ["Vegetables","Maize"], cash: ["Flowers"], horticulture: ["Tomato","Pea","Onion","Vegetables"] },
  "Puducherry":         { primary: ["Rice","Sugarcane","Groundnut"], secondary: ["Pulses","Vegetables"], cash: ["Sesame"], horticulture: ["Mango","Banana","Coconut","Vegetables"] },
  "Andaman & Nicobar":  { primary: ["Rice","Coconut","Areca Nut"], secondary: ["Banana","Cassava"], cash: ["Rubber"], horticulture: ["Pineapple","Papaya","Jackfruit","Mango"] },
};

export function getCropSuggestions(state, soilType, soilData) {
  const locData = LOCATION_CROP_DATA[state];
  const combined = new Set();

  if (locData) {
    [...locData.primary, ...locData.secondary, ...locData.cash, ...locData.horticulture].forEach(c => combined.add(c));
  }

  if (soilData) {
    soilData.bestCrops.forEach(c => combined.add(c));
  }

  // Build intersection (highest confidence = in both)
  const locationSet = locData
    ? new Set([...locData.primary, ...locData.secondary, ...locData.cash, ...locData.horticulture])
    : new Set();
  const soilSet = soilData ? new Set(soilData.bestCrops) : new Set();

  const highConfidence = [...locationSet].filter(c => soilSet.has(c));
  const locationOnly = locData
    ? { primary: locData.primary, secondary: locData.secondary, cash: locData.cash, horticulture: locData.horticulture }
    : null;

  return { highConfidence, locationOnly, soilBest: soilData ? soilData.bestCrops : [] };
}
