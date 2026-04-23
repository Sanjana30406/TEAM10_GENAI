import { computeNaturalFrequency, computeAmplitude, simulateMotion, isResonance } from './physics.js';
import { createCharts } from './charts.js';
import { initThree } from './threeScene.js';

const container = document.getElementById('three-container');
const { scene, camera, renderer, head, body, spring } = initThree(container);
const { freqChart, timeChart } = createCharts();

let params = {
  m: 1,
  k: 20,
  c: 2,
  F0: 10,
  omega: 5
};

// INPUT HANDLING
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', () => {
    params.m = +mass.value;
    params.k = +stiffness.value;
    params.c = +damping.value;
    params.F0 = +force.value;
    params.omega = +frequency.value;
  });
});

let t = 0;

function animate() {
  requestAnimationFrame(animate);

  t += 0.016;

  const y = simulateMotion(t, params.m, params.c, params.k, params.omega, params.F0);

  // MOVE TOY
  head.position.y = 1.8 + y;
  body.position.y = 1 + y * 0.5;

  // SPRING SCALING EFFECT
  spring.scale.y = 1 + y * 0.3;

  updateMetrics();
  updateCharts(y);

  renderer.render(scene, camera);
}

function updateMetrics() {
  const fn = computeNaturalFrequency(params.m, params.k);
  const amp = computeAmplitude(params.m, params.c, params.k, params.omega, params.F0);

  document.getElementById('fn').innerText = fn.toFixed(2) + " Hz";
  document.getElementById('amp').innerText = amp.toFixed(2);

  const resonance = isResonance(params.m, params.k, params.omega);

  document.getElementById('status').innerText =
    resonance ? "⚠ Near Resonance (High Vibration)" : "Stable";

  document.getElementById('status').style.color =
    resonance ? "red" : "lightgreen";
}

function updateCharts(y) {

  // TIME GRAPH
  if (timeChart.data.labels.length > 80) {
    timeChart.data.labels.shift();
    timeChart.data.datasets[0].data.shift();
  }

  timeChart.data.labels.push('');
  timeChart.data.datasets[0].data.push(y);
  timeChart.update();

  // FREQUENCY RESPONSE
  let freqs = [];
  let amps = [];

  for (let w = 0.1; w < 20; w += 0.2) {
    freqs.push(w.toFixed(1));
    amps.push(computeAmplitude(params.m, params.c, params.k, w, params.F0));
  }

  freqChart.data.labels = freqs;
  freqChart.data.datasets[0].data = amps;
  freqChart.update();
}

animate();
