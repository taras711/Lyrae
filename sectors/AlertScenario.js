/**

 * @author Starass

 * @module AlertScenario

 * @description This module handles alert scenarios for the system.

 */

class AlertScenario {

  /**
   * Creates an instance of the AlertScenario.
   * @param {object} context - The context for the alert scenario.
   */
  constructor(context = {}) {
    this.context = context
    this.intent = "alert"
    this.state = "INIT"
    this.log = []
  }

  /**
   * Runs the alert scenario.
   * @param {object} payload - The payload for the alert scenario.
   * @returns {object} The result of the alert scenario.
   */
  async run(payload = {}) {
    this.log.push("→ Alert INIT")
    console.log("🔔 ALERT scénář běží, payload:", payload)

    const sourceIntent = payload.forwardedFrom || "unknown"
    const status = payload.previousStatus || "unknown"
    const actor = payload.actor || "anonymous"
    const sector = payload.sector || "unknown"
    

    const alertPayload = {
        level: "warning",
        message: `Scénář '${sourceIntent}' byl ukončen stavem '${status}'`,
        sourceSector: sector,
        originalIntent: sourceIntent,
        triggeredBy: actor,
        timestamp: new Date().toISOString()
    }

    this.alertPayload = alertPayload         // Saved to instance
    this.audit?.recordAlert(this.alertPayload)
    this.state = "ALERT_GENERATED"
    this.log.push(`→ Alert: ${this.alertPayload.message}`)

    return this.reflect()                    // Now reflect will work correctly
    }

  reflect() {
    return {
        intent: this.intent,
        state: this.state,
        status: this.state,
        alert: this.alertPayload || null,
        context: this.context,
        log: this.log
    }
  }



}


module.exports = AlertScenario