/**

 * @author Starass

 * @module RecoveryScenario

 * @description This module handles the recovery scenario for JWT signature auditing.

 */

const BaseScenario = require("../base/BaseScenario")

class RecoveryScenario extends BaseScenario {

  /**
   * Gets the intent of the scenario.
   * @returns {string} The intent of the scenario.
   */
  getIntent() {
    return "recovery"
  }

  /**
   * Mutates the scenario state based on the recovery attempt.
   * @param {Object} params - The parameters for the mutation.
   * @param {boolean} params.tokenValid - Whether the token is valid.
   * @param {boolean} params.userKnown - Whether the user is known.
   */
  mutate({ tokenValid, userKnown }) {
    this.log = ["→ Recovery INIT"]

    if (!tokenValid || !userKnown) {
      this.state = "ABORTED"
      this.log.push("Recovery failed")
    } else {
      this.state = "REGAINED"
      this.context.component = "RecoveryPanel"
      this.log.push("Access restored")
    }

    this.log.push(`→ State changed to: ${this.state}`)
  }

  async run(payload = {}) {
    this.actor = payload.actor || "anonymous"
    this.mutate(payload)
    return this.reflect()
  }

  /**
   * Reflects the current state of the scenario.
   * @returns {Object} The current state of the scenario.
   */
  reflect() {

    return {
      intent: this.intent,
      state: this.state,
      status: this.state,
      context: this.context,
      actor: this.actor,
      log: this.log
    }
  }
}

module.exports = RecoveryScenario