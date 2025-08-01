/**

 * @author Starass

 * @module ShadowBridge

 * @description This module handles the bridging of shadow client predictions.

 */

/**
 * Forwards a shadow prediction from a client to the orchestrator.
 * @param {object} tunnelFrame - The tunnel frame containing client information.
 * @param {object} reactionResult - The result of the shadow client's prediction.
 * @param {object} orchestrator - The orchestrator instance.
 */
function forwardShadowPrediction(tunnelFrame, reactionResult, orchestrator) {
  const trace = {
    time: Date.now(),
    source: tunnelFrame.clientId,
    predictedIntent: reactionResult.intent,
    confidence: reactionResult.confidence,
    decision: reactionResult.decision,
    sector: reactionResult.sectorId,
    shadow: true
  }

  // 🧠 Záznam do shadow historie
  if (orchestrator.protocol?.describe) {
    orchestrator.protocol.describe().history.push(trace)
  }

  // 🔒 Příprava latentního scénáře, pokud stínový klient je schválen
  if (reactionResult.ghostApproved && orchestrator.prepareGhostScenario) {
    orchestrator.prepareGhostScenario({
      clientId: tunnelFrame.clientId,
      intent: reactionResult.intent,
      sectorId: reactionResult.sectorId,
      trustLevel: reactionResult.confidence
    })
  }

  return trace
}

module.exports = { forwardShadowPrediction }