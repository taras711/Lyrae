/**

 * @author Starass

 * @module SecurityTokenInspector

 * @description This module provides utilities for inspecting security tokens.

 */

/**
 * Inspect a security token and return its details.
 * @param {Object} token - The security token to inspect.
 * @returns {Array<string>} - An array of strings representing the token details.
 */
function inspectSecurityToken(token) {
  const info = token.info()
  const jwt = token.describeJWT()

  const lines = [
    "🔐 Security Token Inspector",
    "----------------------------------",
    `🧑 User ID: ${info.userId}`,
    `🎓 Role: ${info.role}`,
    `🔓 Trust Score: ${info.trust}`,
    `📋 Permissions: ${info.permissions.join(", ")}`,
    `📅 Valid Until: ${new Date(info.validUntil).toLocaleString()}`,
    `⏱️ Expired: ${info.expired ? "❌ Yes" : "✅ No"}`,
    `✅ Valid Overall: ${token.isValid() ? "Yes" : "No"}`,
    `🎭 Role Checks:`,
    `   • isAdmin: ${token.isAdmin()}`,
    `   • isUser: ${token.isUser()}`,
    `   • isGuest: ${token.isGuest()}`,
    `🧬 JWT Payload:`,
    `   ${JSON.stringify(jwt, null, 2)}`,
    `🔍 Raw JWT: ${token.rawToken}`,
    `🔎 Signature Valid: ${token.verifySignature(token.rawToken.split(".")[2]) ? "✅ Yes" : "❌ No"}`,
    `📜 Audit Entry: ${JSON.stringify(token.generateAuditEntry("inspect"), null, 2)}`,
    "----------------------------------"
  ]

  return lines
}

module.exports = { inspectSecurityToken }