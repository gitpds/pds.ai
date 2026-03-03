// pds.ai dashboard template — Chart.js helpers

const COLORS = {
  accent:    '#00d4ff',
  green:     '#00ff88',
  yellow:    '#ffcc00',
  red:       '#ff4444',
  purple:    '#aa66ff',
  orange:    '#ff8833',
  dim:       '#888888',
  grid:      '#1e1e2e',
  cardBg:    '#12121a',
};

// Chart.js global defaults for dark theme
Chart.defaults.color = '#888';
Chart.defaults.borderColor = COLORS.grid;
Chart.defaults.font.family = "'Inter', sans-serif";

/**
 * Create a line chart
 * @param {string} canvasId - Canvas element ID
 * @param {string[]} labels - X-axis labels
 * @param {Array<{label: string, data: number[], color?: string}>} datasets
 * @returns {Chart}
 */
function createLineChart(canvasId, labels, datasets) {
  const ctx = document.getElementById(canvasId);
  const colors = [COLORS.accent, COLORS.green, COLORS.yellow, COLORS.red, COLORS.purple];
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: datasets.map((ds, i) => ({
        label: ds.label,
        data: ds.data,
        borderColor: ds.color || colors[i % colors.length],
        backgroundColor: (ds.color || colors[i % colors.length]) + '1a',
        fill: true,
        tension: 0.3,
        pointRadius: 2,
      })),
    },
    options: {
      responsive: true,
      interaction: { intersect: false, mode: 'index' },
      plugins: { legend: { position: 'top' } },
      scales: {
        y: { grid: { color: COLORS.grid } },
        x: { grid: { color: COLORS.grid } },
      },
    },
  });
}

/**
 * Create a bar chart
 * @param {string} canvasId - Canvas element ID
 * @param {string[]} labels - X-axis labels
 * @param {Array<{label: string, data: number[], color?: string}>} datasets
 * @returns {Chart}
 */
function createBarChart(canvasId, labels, datasets) {
  const ctx = document.getElementById(canvasId);
  const colors = [COLORS.accent, COLORS.green, COLORS.yellow, COLORS.red, COLORS.purple];
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: datasets.map((ds, i) => ({
        label: ds.label,
        data: ds.data,
        backgroundColor: (ds.color || colors[i % colors.length]) + '99',
        borderColor: ds.color || colors[i % colors.length],
        borderWidth: 1,
      })),
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } },
      scales: {
        y: { grid: { color: COLORS.grid } },
        x: { grid: { color: COLORS.grid } },
      },
    },
  });
}

/**
 * Create a doughnut/pie chart
 * @param {string} canvasId - Canvas element ID
 * @param {string[]} labels - Segment labels
 * @param {number[]} data - Segment values
 * @param {'doughnut'|'pie'} [type='doughnut']
 * @returns {Chart}
 */
function createDoughnutChart(canvasId, labels, data, type = 'doughnut') {
  const ctx = document.getElementById(canvasId);
  const colors = [COLORS.accent, COLORS.green, COLORS.yellow, COLORS.red, COLORS.purple, COLORS.orange];
  return new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors.slice(0, data.length).map(c => c + 'cc'),
        borderColor: colors.slice(0, data.length),
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'right' } },
    },
  });
}

/**
 * Populate a table body from array of objects
 * @param {string} tbodyId - Table body element ID
 * @param {Object[]} rows - Array of row objects
 * @param {string[]} columns - Keys to display
 */
function populateTable(tbodyId, rows, columns) {
  const tbody = document.getElementById(tbodyId);
  tbody.innerHTML = rows.map(row =>
    '<tr>' + columns.map(col => `<td>${row[col] ?? ''}</td>`).join('') + '</tr>'
  ).join('');
}

/**
 * Load JSON data file
 * @param {string} [path='data.json'] - Path to JSON file
 * @returns {Promise<any>}
 */
async function loadData(path = 'data.json') {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
  return res.json();
}

// --- Example usage (uncomment and modify) ---
// document.addEventListener('DOMContentLoaded', async () => {
//   const data = await loadData();
//
//   createLineChart('chart1', data.labels, [
//     { label: 'Series A', data: data.seriesA },
//   ]);
//
//   createBarChart('chart2', data.categories, [
//     { label: 'Count', data: data.counts },
//   ]);
//
//   populateTable('data-table-body', data.rows, ['col_a', 'col_b', 'col_c', 'col_d']);
// });
