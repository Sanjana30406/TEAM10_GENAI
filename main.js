export function computeNaturalFrequency(m, k) {
  return (1 / (2 * Math.PI)) * Math.sqrt(k / m);
}

export function computeAmplitude(m, c, k, omega, F0) {
  return F0 / Math.sqrt(Math.pow(k - m * omega * omega, 2) + Math.pow(c * omega, 2));
}

export function simulateMotion(t, m, c, k, omega, F0) {
  let X = computeAmplitude(m, c, k, omega, F0);
  return X * Math.sin(omega * t);
}

export function isResonance(m, k, omega) {
  let wn = Math.sqrt(k / m);
  return Math.abs(omega - wn) < 0.5;
}
