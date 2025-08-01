/**

 * @author Starass

 * @module InterSectorProtocol

 * @description This module handles the communication and reaction protocols between sectors.

 */

class InterSectorProtocol {
  constructor() {
    this.reactionMap = {} // Example: { intent: [{ triggerStatus, targetSector, forwardIntent }] }
    this.history = []
  }

  /**
   * Registers a reaction to an intent.
   * @param {string} sourceIntent - The original intent (e.g. 'recovery').
   * @param {object} config - The reaction configuration.
   */
  registerReaction(sourceIntent, config) {
    this.reactionMap[sourceIntent] ||= []
    this.reactionMap[sourceIntent].push(config)
  }

  /**
   * Handles the output from a sector and decides whether to activate further reactions.
   * @param {object} output - The sector output (e.g. { intent, status, actor, ... })
   * @param {SectorOrchestrator} orchestrator
   * @returns {object[]} The results of the reactions
   */
  handleSectorOutput(output, orchestrator) {
    const rules = this.reactionMap[output.intent] || []
    const results = []

    console.log("🔍 Received status:", output.status)
    console.log("🔍 Rule triggerStatus:", rules.triggerStatus)


    for (const rule of rules) {
      if (output.status === rule.triggerStatus) {
        const target = rule.targetSector
        const intent = rule.forwardIntent

        const token = orchestrator.sectors[target]?.token
        if (!token) continue // No token available for target sector

        const reaction = orchestrator.activateIntent(intent, token, {
            forwardedFrom: output.intent,
            previousStatus: output.status,
            actor: output.actor,
            sector: output.context?.sectorId || "unknown"  // new line
        })


        this.history.push({
          time: Date.now(),
          from: output.intent,
          to: intent,
          status: output.status,
          actor: output.actor,
          targetSector: target,
          sector: output.context?.sectorId

        })

        results.push(reaction)
      }
    }

    return results
  }

  /**
   * Describes the current state of the protocol.
   * @returns {object} The description of the protocol state.
   */
  describe() {
    return {
      reactions: this.reactionMap,
      history: this.history
    }
  }
}

module.exports = InterSectorProtocol