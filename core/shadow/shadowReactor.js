/**

 * @author Starass

 * @module ShadowReactor

 * @description This module handles the shadow reaction evaluation.

 */

/**
 * Evaluates the shadow response based on the tunnel frame and orchestrator.
 * @param {Object} tunnelFrame - The tunnel frame containing shadow context.
 * @param {Object} orchestrator - The orchestrator instance.
 * @returns {Object} - The evaluation result.
 */
function evaluateShadowResponse(tunnelFrame, orchestrator) {
  const { predictedIntent, trustLevel, divergence } = tunnelFrame.shadowContext
  const sector = orchestrator.getSectorByIntent(predictedIntent)

  // Check if the sector exists
  if (!sector) {
    return {
      decision: "none",
      reason: "No matching sector for predicted intent",
      confidence: 0
    }
  }
  
  const rule = orchestrator.evaluator.getRule(predictedIntent)
  if (!rule) {
    return {
      decision: "none",
      reason: "No rule defined for intent",
      confidence: trustLevel
    }
  }

  const trustPass = trustLevel >= rule.trustMin // Check if trust level meets minimum requirement
  const divergencePenalty = divergence === "none" ? 0 : divergence === "low" ? 0.1 : 0.3 // Check divergence penalty

  return {
    decision: trustPass ? "simulateTrigger" : "observeOnly",
    sectorId: sector.id,
    intent: predictedIntent,
    confidence: trustLevel - divergencePenalty,
    ghostApproved: trustPass && divergence !== "high"
  }
}

module.exports = { evaluateShadowResponse }