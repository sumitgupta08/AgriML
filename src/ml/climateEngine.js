// Climate-Aware Decision Engine
// Incorporates weather forecast data and modifies recommendations based on upcoming conditions

export class ClimateEngine {
    constructor() {
        // Simulated 7-day forecast (in production, this would call a weather API)
        this.forecast = this._generateForecast();
    }

    _generateForecast() {
        const today = new Date();
        const forecast = [];
        // Deterministic but varied forecast
        const baseTemp = 28;
        const baseRain = 5;
        const baseHumidity = 65;

        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const variation = Math.sin(i * 1.2) * 0.5 + Math.cos(i * 0.8) * 0.3;

            forecast.push({
                date: date.toISOString().split('T')[0],
                dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
                tempHigh: Math.round((baseTemp + 4 + variation * 6) * 10) / 10,
                tempLow: Math.round((baseTemp - 4 + variation * 4) * 10) / 10,
                rainfall: Math.round(Math.max(0, baseRain + variation * 15 + (i === 3 || i === 5 ? 20 : 0)) * 10) / 10,
                humidity: Math.round(Math.min(100, Math.max(30, baseHumidity + variation * 15))),
                condition: this._getCondition(variation, i),
                windSpeed: Math.round((8 + variation * 5) * 10) / 10
            });
        }
        return forecast;
    }

    _getCondition(variation, dayIndex) {
        if (dayIndex === 3 || dayIndex === 5) return 'Rainy';
        if (variation > 0.3) return 'Sunny';
        if (variation > 0) return 'Partly Cloudy';
        if (variation > -0.3) return 'Cloudy';
        return 'Overcast';
    }

    // Update forecast with user-provided data
    updateForecast(customForecast) {
        if (Array.isArray(customForecast) && customForecast.length > 0) {
            this.forecast = customForecast;
        }
    }

    getForecast() {
        return [...this.forecast];
    }

    // Analyze upcoming climate impact on fertilizer application
    analyzeClimateImpact(input) {
        const upcoming = this.forecast.slice(0, 5); // Next 5 days
        const totalRain = upcoming.reduce((s, d) => s + d.rainfall, 0);
        const avgTemp = upcoming.reduce((s, d) => s + (d.tempHigh + d.tempLow) / 2, 0) / upcoming.length;
        const avgHumidity = upcoming.reduce((s, d) => s + d.humidity, 0) / upcoming.length;
        const rainyDays = upcoming.filter(d => d.rainfall > 10).length;

        const adjustments = [];
        let quantityMultiplier = 1.0;
        let timingAdvice = 'Apply fertilizer as planned.';
        let bestApplicationDay = 0;
        let riskLevel = 'low';

        // Heavy rain coming — delay application
        if (totalRain > 50) {
            quantityMultiplier = 0.85;
            timingAdvice = 'Heavy rainfall expected. Consider delaying application or use slow-release fertilizer.';
            riskLevel = 'high';
            adjustments.push({ factor: 'Heavy Rain', impact: 'Nutrient leaching risk — reduce quantity by 15%', severity: 'high' });
        } else if (totalRain > 25) {
            quantityMultiplier = 0.92;
            timingAdvice = 'Moderate rainfall expected. Split application recommended.';
            riskLevel = 'medium';
            adjustments.push({ factor: 'Moderate Rain', impact: 'Some leaching risk — reduce quantity by 8%', severity: 'medium' });
        }

        // High temperature stress
        if (avgTemp > 35) {
            quantityMultiplier *= 0.9;
            timingAdvice = 'High temperatures expected. Apply fertilizer in early morning.';
            adjustments.push({ factor: 'Heat Stress', impact: 'Volatilization risk — apply in cooler hours', severity: 'medium' });
        }

        // High humidity — fungal risk
        if (avgHumidity > 80) {
            adjustments.push({ factor: 'High Humidity', impact: 'Monitor for fungal diseases after fertilization', severity: 'low' });
        }

        // Find best application day (dry, moderate temp)
        let bestScore = -1;
        upcoming.forEach((day, i) => {
            const score = (day.rainfall < 5 ? 3 : 0) + (day.tempHigh < 35 ? 2 : 0) + (day.humidity < 75 ? 1 : 0);
            if (score > bestScore) { bestScore = score; bestApplicationDay = i; }
        });

        return {
            totalRainfall: Math.round(totalRain),
            avgTemperature: Math.round(avgTemp * 10) / 10,
            avgHumidity: Math.round(avgHumidity),
            rainyDays,
            quantityMultiplier: Math.round(quantityMultiplier * 100) / 100,
            timingAdvice,
            bestApplicationDay: upcoming[bestApplicationDay]?.dayName || 'Today',
            bestApplicationDate: upcoming[bestApplicationDay]?.date || '',
            adjustments,
            riskLevel,
            forecast: upcoming
        };
    }
}

export const WEATHER_ICONS = {
    'Sunny': '☀️',
    'Partly Cloudy': '⛅',
    'Cloudy': '☁️',
    'Overcast': '🌥️',
    'Rainy': '🌧️',
    'Stormy': '⛈️'
};
