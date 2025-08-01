/**

 * Detect trust anomalies in the history.

 * @param {Array} history - Trust history.

 * @param {number} thresholdDrop - Threshold for trust drop.

 * @param {number} thresholdJump - Threshold for trust jump.

 * @returns {Array} - List of detected anomalies.

 */

function detectTrustAnomalies(history, thresholdDrop = 0.25, thresholdJump = 0.25) {
  if (!history || history.length < 2) return [] // No anomalies

  const anomalies = [] // List of detected anomalies

  for (let i = 1; i < history.length; i++) {
    const prev = history[i - 1] // Previous record
    const curr = history[i] // Current record

    const delta = curr.trust - prev.trust // Change in trust
    const timeGap = curr.time - prev.time // Time difference

    // Detect trust drop
    if (delta <= -thresholdDrop) {
      anomalies.push({
        type: "Trust Drop",
        delta: delta.toFixed(2),
        from: prev.trust,
        to: curr.trust,
        time: curr.time,
        timeGap,
        severity: "🚨"
      })
    // Continue analysis
    } else if (delta >= thresholdJump) {
      anomalies.push({
        type: "Trust Jump",
        delta: delta.toFixed(2),
        from: prev.trust,
        to: curr.trust,
        time: curr.time,
        timeGap,
        severity: "⚠️"
      })
    }
  }

  return anomalies
}

module.exports = {
  detectTrustAnomalies
}