/**

 * @author Starass

 * @module GhostScenarioQueue

 * @description This module handles the ghost scenario queue for JWT signature attempts.

 */

const ghostQueue = [] // Queue for ghost scenarios

/**
 * Enqueues a new ghost scenario.
 * @param {Object} params - The parameters for the ghost scenario.
 * @param {string} params.clientId - The client ID.
 * @param {string} params.intent - The intent.
 * @param {string} params.sectorId - The sector ID.
 * @param {number} params.trustLevel - The trust level.
 * @returns {Object} The enqueued ghost scenario.
 */
function enqueueGhostScenario({ clientId, intent, sectorId, trustLevel }) {
  const scenario = {
    id: `ghost-${Date.now()}`,
    clientId,
    intent,
    sectorId,
    trustLevel,
    createdAt: new Date().toISOString(),
    status: "pending"
  }

  ghostQueue.push(scenario)
  return scenario
}

/**
 * Lists all ghost scenarios.
 * @param {Function} filterFn - Optional filter function.
 * @returns {Array} The list of ghost scenarios.
 */
function listGhostScenarios(filterFn = null) {
  return filterFn ? ghostQueue.filter(filterFn) : [...ghostQueue]
}

/**
 * Expires a ghost scenario.
 * @param {string} id - The ID of the ghost scenario.
 */
function expireGhostScenario(id) {
  const index = ghostQueue.findIndex(s => s.id === id)
  if (index !== -1) ghostQueue[index].status = "expired"
}

/**
 * Activates a ghost scenario.
 * @param {string} id - The ID of the ghost scenario.
 */
function activateGhostScenario(id) {
  const index = ghostQueue.findIndex(s => s.id === id)
  if (index !== -1) ghostQueue[index].status = "activated"
}

module.exports = {
  enqueueGhostScenario,
  listGhostScenarios,
  expireGhostScenario,
  activateGhostScenario
}