/**

 * @author Starass

 * @module AuthCenter

 * @description This module handles authentication and authorization processes.

 */

const Module = require("../../core/runtime/Module")

// Create an instance of the AuthCenter module
const AuthCenter = new Module({
  name: "AuthCenter",
  author: "Taras",
  version: "1.0.0",
  access: "internal",
  properties: {
    status: "idle",
    session: null,
    retryLimit: 3,
    config: {
      allowGuests: false
    }
  }
})

// Add the initSession method
AuthCenter.addMethod("initSession", {
  background: {
    contextScope: "session",
    allowedCallers: ["LoginScenario"],
    integrityCheck: true
  },
  logic: (args, context) => {
    const { userData } = args
    if (!userData || !userData.valid) {
      AuthCenter.setProperty("status", "locked")
      return "LOCKED"
    }

    // Create a new session
    const newSession = {
      userId: userData.id,
      started: Date.now(),
      trustScore: userData.trustScore || 0.7
    }

    context.session = newSession
    AuthCenter.setProperty("status", "active")
    AuthCenter.setProperty("session", newSession)

    return "ACTIVE" // Session initialized successfully
  }
})

module.exports = AuthCenter