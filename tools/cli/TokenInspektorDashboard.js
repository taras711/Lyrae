/**

 * @author Starass

 * @module TokenInspectorDashboard

 * @description This module provides a dashboard for inspecting security tokens.

 */

const { signToken } = require("../../core/security/SecurityTokenLayer")
const SecurityToken = require("../../core/security/SecurityToken")
const { inspectSecurityToken } = require("./SecurityTokenInspector")

/**
 * Create a demo security token for testing purposes.
 * @returns {string} - The signed JWT token.
 */
function createDemoToken() {
  return signToken({
    userId: "USR-1499",
    role: "admin",
    trust: 0.81
  })
}

/**
 * Run the Token Inspector Dashboard.
 */
function runDashboard() {
  const tokenString = createDemoToken()
  const token = new SecurityToken(tokenString)

  const lines = inspectSecurityToken(token)

  console.log("\n🧠 TokenInspectorDashboard · Runtime Token Snapshot\n")
  lines.forEach(line => console.log(line))
  console.log("\n📦 Raw JWT:", token.rawToken)
}

// Run only if this file is the main script
if (require.main === module) {
  runDashboard()
}