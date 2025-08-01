/**

 * @author Starass

 * @module BaseScenario

 * @description This module handles the base scenario for JWT signature auditing.

 */

class BaseScenario {

  /**
   * Creates an instance of the BaseScenario class.
   * @param {Object} context - The context for the scenario.
   */
  constructor(context = {}) {
    this.context = context
    this.state = "INIT"
    this.intent = this.getIntent()
  }

  /**
   * Gets the intent of the scenario.
   * @returns {string} - The intent of the scenario.
   */
  getIntent() {
    return "generic"
  }

  /**
   * Gets the entry point of the scenario.
   * @returns {string} - The entry point of the scenario.
   */
  getEntryPoint() {
    return "core.scenario.activate"
  }

  /**
   * Mutates the scenario state based on the token context.
   * @param {Object} tokenContext - The context of the token.
   */
  mutate(tokenContext) {
    // Default mutation: change state based on role
    if (tokenContext.role === "admin") {
      this.state = "ELEVATED"
    } else {
      this.state = "LIMITED"
    }
  }

  /**
   * Reflects the current state of the scenario.
   * @returns {Object} - The reflected state of the scenario.
   */
  reflect() {
    return {
      intent: this.intent,
      state: this.state,
      status: this.state,
      context: this.context
    }
  }

  /**
   * Gets the audit trace for a specific command.
   * @param {string} command - The command to audit.
   * @returns {Object} - The audit trace for the command.
   */
  getAuditTrace(command) {
    return {
      time: Date.now(),
      scenario: this.intent,
      state: this.state,
      command,
      actor: this.context.userId || "unknown"
    }
  }
}

module.exports = BaseScenario