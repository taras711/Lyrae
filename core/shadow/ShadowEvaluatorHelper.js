/**

 * @author Starass

 * @module ShadowEvaluatorHelper

 * @description This module provides helper functions for evaluating shadow interactions.

 */

const { enqueueGhostScenario } = require("../../sectors/orchestration/ghostScenarioQueue")

/**
 * Processes the mirror evaluation result.
 * @param {Object} mirrorResult - The result of the mirror evaluation.
 * @param {Object} ghostToken - The ghost token associated with the user.
 * @param {Array} shadowHistory - The history of shadow interactions.
 * @returns {Object} - The processing result.
 */
function processMirrorEvaluation(mirrorResult, ghostToken, shadowHistory = []) {
  const trace = {
    time: Date.now(),
    source: ghostToken.userId,
    intent: mirrorResult.intent,
    approved: mirrorResult.approved,
    sector: mirrorResult.sector || "unknown",
    trust: ghostToken.trust,
    mirror: true,
    reason: mirrorResult.reason
  }

  // Writing the trace to shadow history
  if (!shadowHistory) {
    shadowHistory = []
  }
  shadowHistory.push(trace)

  // Decision based on approval
  let action = "observeOnly"

  if (mirrorResult.approved) {
    // ⏳ Creating ghost scenario
    enqueueGhostScenario({
      clientId: ghostToken.userId,
      intent: mirrorResult.intent,
      sectorId: mirrorResult.sector,
      trustLevel: ghostToken.trust
    })
    action = "simulateTrigger"
  }

  return {
    recommendation: action,
    trace
  }
}

module.exports = { processMirrorEvaluation }