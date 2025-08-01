/**

 * @author Starass

 * @module SectorOrchestrator

 * @description This module handles the orchestration of sector interactions and intent management.

 */

const IntentEvaluator = require("../../sectors/orchestration/IntentEvaluator")
const TrustSupervisor = require("../../core/security/TrustSupervisor")

this.evaluator = new IntentEvaluator()

class SectorOrchestrator {

  /**
   * Creates an instance of the SectorOrchestrator.
   */
  constructor() {
    this.sectors = {} // { id: SectorNode instance }
    this.intentMap = {} // { intent: sectorId }
    this.history = []  // log směrování
    this.evaluator = new IntentEvaluator()
    this.supervisor = new TrustSupervisor()

    this.evaluator.registerRule("diagnostics", [
      { role: "admin", trustMin: 0.6, sector: "DiagnosticsUnit" }
    ])

    this.evaluator.registerRule("recovery", [
      { role: "admin", trustMin: 0.5, sector: "CoreSector" }
    ])

    this.evaluator.registerRule("audit", [
      { role: "*", trustMin: 0.5, sector: "AuditCenter" }
    ])


  }

  /**
   * Registers a sector node.
   * @param {string} id - The sector ID.
   * @param {SectorNode} sectorNode - The sector node instance.
   */
  registerSector(id, sectorNode) {
    this.sectors[id] = sectorNode
  }

  /**
   * Maps an intent to a sector ID.
   * @param {string} intent - The intent name.
   * @param {string} sectorId - The sector ID.
   */
  mapIntent(intent, sectorId) {
    this.intentMap[intent] = sectorId
  }


  /**
   * Sends a message to a target sector.
   * @param {string} targetSectorId - The target sector ID.
   * @param {object} message - The message object.
   */
  send(targetSectorId, message) {
    const sector = this.sectors[targetSectorId]
    if (!sector) throw new Error(`❌ Sektor '${targetSectorId}' není registrován.`)
    sector.tunnel.send(`sector.${targetSectorId}`, message)
    this.history.push({
      time: Date.now(),
      type: "message",
      to: targetSectorId,
      content: message
    })
  }

  /**
   * Activates an intent for a specific sector.
   * @param {string} intent - The intent to activate.
   * @param {object} token - The user token.
   * @param {object} payload - Additional payload data.
   */
  activateIntent(intent, token, payload = {}) {
    const evalResult = this.evaluator.evaluate(intent, token)

    const approved = evalResult.approved
    const sector = this.sectors[evalResult.sector]

    if (!sector) {
      return {
        status: "ERROR",
        reason: `Sektor '${evalResult.sector}' není dostupný.`,
        actor: token.userId
      }
    }

    const response = approved
      ? sector.activateScenario(intent, payload)
      : { status: "ABORTED", reason: evalResult.reason, actor: token.userId }

    const trustRecord = this.supervisor.observeIntent({ token, intent, approved })

    token.trust = trustRecord.trust

    this.history.push({
      time: Date.now(),
      type: "intent",
      intent,
      sectorId: evalResult.sector,
      actor: token.userId,
      approved,
      trustBefore: token.trust,
      trustAfter: trustRecord.trust,
      reason: evalResult.reason
    })

    return response
  }

  /**
   * Describes the current state of the orchestrator.
   * @returns {object} The description of the orchestrator state.
   */
  describe() {
    return {
      sectors: Object.keys(this.sectors),
      intents: this.intentMap,
      lastEvent: this.history.at(-1),
      log: this.history
    }
  }
}

module.exports = SectorOrchestrator