// Charts Module — Radar, Feature Importance, Deficit, Probability charts
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// Store chart instances to destroy on update
let charts = {};

export function initCharts() {
    // Charts are initialized when results are rendered
}

function destroyChart(id) {
    if (charts[id]) {
        charts[id].destroy();
        delete charts[id];
    }
}

const chartColors = {
    green: 'rgba(52, 211, 153, 0.8)',
    greenFill: 'rgba(52, 211, 153, 0.15)',
    yellow: 'rgba(251, 191, 36, 0.8)',
    yellowFill: 'rgba(251, 191, 36, 0.15)',
    blue: 'rgba(96, 165, 250, 0.8)',
    red: 'rgba(248, 113, 113, 0.8)',
    purple: 'rgba(167, 139, 250, 0.8)',
    pink: 'rgba(244, 114, 182, 0.8)',
    white: 'rgba(232, 245, 233, 0.7)',
    gridColor: 'rgba(255,255,255,0.06)',
    textColor: 'rgba(156, 163, 175, 0.9)',
};

const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: { color: chartColors.textColor, font: { family: "'Inter'" }, padding: 12 }
        },
        tooltip: {
            backgroundColor: 'rgba(10, 15, 13, 0.9)',
            titleColor: '#fff',
            bodyColor: '#9ca3af',
            borderColor: 'rgba(52, 211, 153, 0.3)',
            borderWidth: 1,
            cornerRadius: 8,
            padding: 10,
            titleFont: { family: "'Inter'", weight: '600' },
            bodyFont: { family: "'Inter'" }
        }
    }
};

export function updateCharts(result, input) {
    // Wait for DOM to have canvases
    requestAnimationFrame(() => {
        renderRadarChart(input);
        renderImportanceChart(result.featureImportance);
        renderDeficitChart(result.optResult.nutrientDeficits);
        renderProbabilityChart(result.fertResult);
    });
}

function renderRadarChart(input) {
    const canvas = document.getElementById('chart-radar');
    if (!canvas) return;
    destroyChart('radar');

    // Normalize values to 0-100 scale for radar
    const data = {
        labels: ['Nitrogen', 'Phosphorus', 'Potassium', 'pH', 'Moisture'],
        datasets: [{
            label: 'Current Levels',
            data: [
                Math.min(100, (input.nitrogen / 200) * 100),
                Math.min(100, (input.phosphorus / 100) * 100),
                Math.min(100, (input.potassium / 100) * 100),
                Math.min(100, (input.pH / 10) * 100),
                input.moisture
            ],
            backgroundColor: chartColors.greenFill,
            borderColor: chartColors.green,
            borderWidth: 2,
            pointBackgroundColor: chartColors.green,
            pointBorderColor: '#fff',
            pointBorderWidth: 1,
            pointRadius: 4,
            pointHoverRadius: 6
        }, {
            label: 'Optimal Range',
            data: [50, 55, 50, 65, 60],
            backgroundColor: chartColors.yellowFill,
            borderColor: chartColors.yellow,
            borderWidth: 1.5,
            borderDash: [4, 4],
            pointBackgroundColor: chartColors.yellow,
            pointRadius: 3
        }]
    };

    charts.radar = new Chart(canvas, {
        type: 'radar',
        data,
        options: {
            ...commonOptions,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { color: chartColors.textColor, backdropColor: 'transparent', font: { size: 10, family: "'Inter'" } },
                    grid: { color: chartColors.gridColor },
                    angleLines: { color: chartColors.gridColor },
                    pointLabels: { color: chartColors.white, font: { size: 11, family: "'Inter'", weight: '500' } }
                }
            },
            plugins: {
                ...commonOptions.plugins,
                legend: { ...commonOptions.plugins.legend, position: 'bottom' }
            }
        }
    });
}

function renderImportanceChart(featureImportance) {
    const canvas = document.getElementById('chart-importance');
    if (!canvas) return;
    destroyChart('importance');

    const labels = {
        nitrogen: 'Nitrogen', phosphorus: 'Phosphorus', potassium: 'Potassium',
        pH: 'Soil pH', moisture: 'Moisture', temperature: 'Temperature',
        rainfall: 'Rainfall', humidity: 'Humidity'
    };

    const entries = Object.entries(featureImportance)
        .filter(([k]) => !k.startsWith('crop_'))
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);

    const barColors = [
        chartColors.green, chartColors.yellow, chartColors.blue,
        chartColors.purple, chartColors.pink, chartColors.red,
        'rgba(34, 211, 238, 0.8)', 'rgba(163, 230, 53, 0.8)'
    ];

    charts.importance = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: entries.map(([k]) => labels[k] || k),
            datasets: [{
                label: 'Importance',
                data: entries.map(([, v]) => Math.round(v * 1000) / 10),
                backgroundColor: barColors,
                borderColor: barColors.map(c => c.replace(/[\d.]+\)$/, '1)')),
                borderWidth: 1,
                borderRadius: 6,
                barThickness: 22,
            }]
        },
        options: {
            ...commonOptions,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: chartColors.gridColor },
                    ticks: { color: chartColors.textColor, font: { family: "'Inter'", size: 10 }, callback: v => v + '%' }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: chartColors.white, font: { family: "'Inter'", size: 11, weight: '500' } }
                }
            },
            plugins: {
                ...commonOptions.plugins,
                legend: { display: false },
                tooltip: {
                    ...commonOptions.plugins.tooltip,
                    callbacks: { label: ctx => `Importance: ${ctx.raw}%` }
                }
            }
        }
    });
}

function renderDeficitChart(deficits) {
    const canvas = document.getElementById('chart-deficit');
    if (!canvas) return;
    destroyChart('deficit');

    const labels = ['Nitrogen', 'Phosphorus', 'Potassium'];
    const values = [deficits.nitrogen, deficits.phosphorus, deficits.potassium];
    const colors = values.map(v => v > 40 ? chartColors.red : v > 15 ? chartColors.yellow : chartColors.green);

    charts.deficit = new Chart(canvas, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Deficit (kg/ha)',
                data: values,
                backgroundColor: colors.map(c => c.replace(/[\d.]+\)$/, '0.6)')),
                borderColor: colors,
                borderWidth: 2,
                borderRadius: 8,
                barThickness: 40,
            }]
        },
        options: {
            ...commonOptions,
            scales: {
                x: { grid: { display: false }, ticks: { color: chartColors.white, font: { family: "'Inter'", weight: '500' } } },
                y: {
                    beginAtZero: true,
                    grid: { color: chartColors.gridColor },
                    ticks: { color: chartColors.textColor, font: { family: "'Inter'", size: 10 }, callback: v => v + ' kg/ha' }
                }
            },
            plugins: {
                ...commonOptions.plugins,
                legend: { display: false },
                tooltip: {
                    ...commonOptions.plugins.tooltip,
                    callbacks: { label: ctx => `Deficit: ${ctx.raw} kg/ha` }
                }
            }
        }
    });
}

function renderProbabilityChart(fertResult) {
    const canvas = document.getElementById('chart-probabilities');
    if (!canvas) return;
    destroyChart('probabilities');

    const probs = fertResult.probabilities || {};
    const sorted = Object.entries(probs).sort((a, b) => b[1] - a[1]).slice(0, 6);

    const palette = [
        chartColors.green, chartColors.yellow, chartColors.blue,
        chartColors.purple, chartColors.pink, chartColors.red
    ];

    charts.probabilities = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: sorted.map(([k]) => k),
            datasets: [{
                data: sorted.map(([, v]) => Math.round(v * 1000) / 10),
                backgroundColor: palette.slice(0, sorted.length).map(c => c.replace(/[\d.]+\)$/, '0.7)')),
                borderColor: palette.slice(0, sorted.length),
                borderWidth: 2,
                hoverOffset: 8
            }]
        },
        options: {
            ...commonOptions,
            cutout: '55%',
            plugins: {
                ...commonOptions.plugins,
                legend: {
                    ...commonOptions.plugins.legend,
                    position: 'bottom',
                    labels: { ...commonOptions.plugins.legend.labels, usePointStyle: true, pointStyle: 'circle', padding: 14 }
                },
                tooltip: {
                    ...commonOptions.plugins.tooltip,
                    callbacks: { label: ctx => `${ctx.label}: ${ctx.raw}%` }
                }
            }
        }
    });
}
