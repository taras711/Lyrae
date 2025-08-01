/**

 * @author Starass

 * @module SecurityGroup

 * @description This module handles auditing of scenario execution attempts.

 */

const LoginSector = require("../login/loginSector")

class SecurityGroup {

  /**
   * @constructor
   * @param {Object} context - The context of the security group.
   * @param {Object} token - The user token.
   * @param {Object} serverReply - The server reply object.
   */
  constructor(context = {}, token, serverReply = {}) {
    this.context = context
    this.token = token
    this.serverReply = serverReply
    this.actions = []
  }

  /**
   * Resolves all security actions.
   * @returns {Array} The list of all actions to take.
   */
  resolveAll() {
    // Login sektor 
    const loginSector = new LoginSector(this.context, this.token)
    const loginActions = loginSector.resolve(this.serverReply)
    this.actions.push(...loginActions)

    // Next sector (e.g. Audit or RiskSector) — can be connected later
    // const auditSector = new AuditSector(...)
    // this.actions.push(...auditSector.resolve(...))

    return this.actions
  }

  /**
   * Gets the list of all actions to take.
   * @returns {Array} The list of all actions to take.
   */
  getActions() {
    return this.actions
  }

  /**
   * Reports the security group status.
   * @returns {Object} The report object.
   */
  report() {
    return {
      group: "SecurityGroup",
      totalActions: this.actions.length,
      fingerprint: this.token.getFingerprint(),
      auditMode: this.token.auditMode
    }
  }
}

module.exports = SecurityGroup