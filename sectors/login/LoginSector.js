/**

 * @author Starass

 * @module LoginSector

 * @description This module handles auditing of login attempts.

 */

const AuthCenter = require("../../modules/auth/AuthCenter")

class LoginSector {

  /**
   * @constructor
   * @param {Object} context - The context of the login attempt.
   * @param {Object} token - The user token.
   */
  constructor(context = {}, token) {
    this.context = context
    this.token = token
  }

  /**
   * Resolves the login actions based on the server reply.
   * @param {Object} serverReply - The server reply object.
   * @returns {Array} The list of actions to take.
   */
  resolve(serverReply = {}) {
    const trust = this.token.trustScore
    const replyType = serverReply.type || "none"
    const actions = []

    // High trust and successful reply
    if (trust >= 0.8 && replyType === "success") {
      actions.push("EnableDashboard")
      actions.push("LoadAdminPanel")
    } else if (trust >= 0.5) {
      actions.push("EnableRestrictedPanel")
    } else {
      actions.push("BlockAccess")
      actions.push("ActivateAuditMode")
    }

    return actions
  }
}

module.exports = LoginSector