/**

 * @author Starass

 * @module Token

 * @description This module handles the creation and management of tokens.

 */

class Token {

  /**
   * Creates an instance of the Token class.
   * @param {Object} config - The configuration object for the token.
   */
  constructor(config = {}) {
    this.userId = config.userId || null
    this.role = config.role || "guest"
    this.trustScore = config.trustScore || 0.0
    this.expiry = config.expiry || Date.now() + 60 * 60 * 1000 // 1h default
    this.context = config.context || {}
    this.auditMode = config.auditMode || false
  }

  /**
   * Checks if the token is valid.
   * @returns {boolean} - True if the token is valid, false otherwise.
   */
  isValid() {
    return this.trustScore > 0.5 && Date.now() < this.expiry
  }

  /**
   * Elevates the role of the token.
   * @param {string} newRole - The new role to assign to the token.
   */
  elevateRole(newRole) {
    this.role = newRole
  }

  /**
   * Decreases the trust score of the token.
   * @param {number} value - The amount to decrease the trust score by.
   */
  decreaseTrust(value) {
    this.trustScore -= value
    if (this.trustScore < 0) this.trustScore = 0
  }

  /**
   * Activates audit mode for the token.
   */
  activateAudit() {
    this.auditMode = true
  }

  /**
   * Gets the fingerprint of the token.
   * @returns {string} - The token fingerprint.
   */
  getFingerprint() {
    return `${this.userId}_${this.role}_${this.trustScore.toFixed(2)}`
  }

  /**
   * Gets the information about the token.
   * @returns {Object} - The token information.
   */
  info() {
    return {
      role: this.role,
      trust: this.trustScore,
      valid: this.isValid(),
      audit: this.auditMode
    }
  }
}

module.exports = Token