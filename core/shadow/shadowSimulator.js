/**

 * @author Starass

 * @module ShadowSimulator

 * @description This module handles the simulation of shadow interactions.

 */

/**
 * Computes the trust score for a ghost token.
 * @param {Object} token - The ghost token.
 * @returns {number} - The computed trust score.
 */
function computeTrustScore(token) {
  const base = token.trust || 0
  const bonus = token.history?.length * 0.02 || 0
  return Math.min(1, base + bonus)
}

/**
 * Predicts the intent based on the user's interaction history.
 * @param {Array} history - The user's interaction history.
 * @returns {string} - The predicted intent.
 */
function intentPredictor(history = []) {
  if (history.includes("hovered:alertPayload")) return "alert"
  if (history.includes("viewed:sector:RecoveryHub")) return "recovery"
  return "unknown"
}

/**
 * Estimates the divergence between predicted and actual intents.
 * @param {string} predicted - The predicted intent.
 * @param {string} actual - The actual intent.
 * @returns {string} - The divergence level.
 */
function estimateDivergence(predicted, actual = "idle") {
  return predicted === actual ? "none" : "low"
}

/**
 * Simulates the shadow synchronization process for a ghost token.
 * @param {Object} ghostToken - The ghost token to simulate.
 * @returns {Object} - The simulated tunnel frame.
 */
function simulateShadowSync(ghostToken) {
  const predictedIntent = intentPredictor(ghostToken.history)
  const trustLevel = computeTrustScore(ghostToken)
  const divergenceLevel = estimateDivergence(predictedIntent)

  const tunnelFrame = {
    clientId: ghostToken.userId || "anonymous",
    ghostToken,
    shadowContext: {
      predictedIntent,
      trustLevel,
      divergence: divergenceLevel,
      timestamp: new Date().toISOString()
    },
    status: "passive",
    syncLevel: trustLevel > 0.7 ? "active" : "passive"
  }

  return tunnelFrame
}

module.exports = { simulateShadowSync }