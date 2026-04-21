export function createCharts() {

  const freqCtx = document.getElementById('freqChart').getContext('2d');
  const timeCtx = document.getElementById('timeChart').getContext('2d');

  const freqChart = new Chart(freqCtx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Amplitude', data: [] }] },
    options: { responsive: true }
  });

  const timeChart = new Chart(timeCtx, {
    type: 'line',
    data: { labels: [], datasets: [{ label: 'Displacement', data: [] }] },
    options: { responsive: true }
  });

  return { freqChart, timeChart };
}
