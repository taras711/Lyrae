/**

 * @author Starass

 * @module LoginScenario

 * @description This module handles the login scenario for JWT signature auditing.

 */

const AuthCenter = require("../../modules/auth/AuthCenter")

class LoginScenario {

  /**
   * Creates an instance of the LoginScenario class.
   * @param {Object} context - The context for the scenario.
   */
  constructor(context = {}) {
    this.state = "INIT"
    this.context = context
    this.log = []
  }

  /**
   * Runs the login scenario.
   * @param {Object} userData - The user data for the login attempt.
   */
  run(userData) {
    this.log.push(`→ State: ${this.state}`)

    if (this.state === "INIT") {
      const result = AuthCenter.invoke("initSession", { userData }, this.context)
      this.log.push(`Auth result: ${result}`)

      if (result === "ACTIVE") {
        this.state = "VALIDATED"
      } else if (userData.trustScore >= 0.4) {
        this.state = "LIMITED"
      } else {
        this.state = "LOCKED"
      }
      this.log.push(`→ State changed to: ${this.state}`)
    }

    this.render()
  }

  /**
   * Renders the current state of the login scenario.
   */
  render() {
    switch (this.state) {
      case "VALIDATED": // User is validated
        console.log("✅ Dashboard access granted.")
        break
      case "LIMITED": // User is limited
        console.log("⚠️ Limited mode. Some features unavailable.")
        break
      case "LOCKED": // User is locked
        console.log("🔒 Access denied.")
        break
      default: // User is in an unknown state
        console.log("⏳ Waiting for state.")
    }
  }

  getLog() {
    return this.log
  }
}

module.exports = LoginScenario