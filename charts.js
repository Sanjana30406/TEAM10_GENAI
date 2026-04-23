export function createCharts() {

  const freqCtx = document.getElementById('freqChart').getContext('2d');
  const timeCtx = document.getElementById('timeChart').getContext('2d');

  const freqChart = new Chart(freqCtx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Frequency Response',
        data: [],
        borderColor: '#22c55e',
        tension: 0.3
      }]
    },
    options: {
      plugins: { legend: { labels: { color: 'white' } } },
      scales: {
        x: { ticks: { color: 'white' } },
        y: { ticks: { color: 'white' } }
      }
    }
  });

  const timeChart = new Chart(timeCtx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Time Response',
        data: [],
        borderColor: '#38bdf8',
        tension: 0.3
      }]
    },
    options: {
      plugins: { legend: { labels: { color: 'white' } } },
      scales: {
        x: { ticks: { color: 'white' } },
        y: { ticks: { color: 'white' } }
      }
    }
  });

  return { freqChart, timeChart };
}
