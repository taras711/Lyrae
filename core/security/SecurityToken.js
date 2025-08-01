/**

 * @author Starass

 * @module SecurityToken

 * @description This module provides functionality for managing security tokens, including validation, permissions, and auditing.

 */

const { verifyToken } = require("./SecurityTokenLayer")  // importing the verifyToken function
const { log } = require("../services/PersistentAuditService") // importing the log function from PersistentAuditService
const crypto = require("crypto")

class SecurityToken {

  /**
   * Creates a new security token.
   * @param {string} tokenString - JWT token as a string.
   */
  constructor(tokenString) {
    const payload = verifyToken(tokenString)

    this.valid = !!payload // Check token validity
    this.userId = payload?.userId || null // User ID
    this.role = payload?.role || "guest" // User role
    this.trust = payload?.trust || 0 // Trust level
    this.issuedAt = payload?.iat ? payload.iat * 1000 : Date.now() // Issued at
    this.validUntil = payload?.exp ? payload.exp * 1000 : this.issuedAt + 3600000 // Valid until
    this.permissions = SecurityToken.getPermissionsForRole(this.role) // Permissions based on role
    this.rawToken = tokenString
  }

  /**
   * Gets permissions based on role.
   * @param {string} role - User role.
   * @returns {Array} - List of permissions for the role.
   */
  static getPermissionsForRole(role) {
    const registry = {
      admin: ["*"],
      user: ["core.view","core.sync.activate", "core.scenario.run", "core.token.info"],
      guest: ["core.view"]
    }

    return registry[role] || []
  }

  /**
   * Creates an audit entry for token activity.
   * @param {string} action - Action to log.
   * @param {string} status - Status of the log entry.
   * @param {Object} extra - Additional information for the log entry.
   * @returns {Object} - Created audit log entry.
   */
  generateAuditEntry(action = "token.inspect", status = "✅ OK", extra = {}) {
    const entry = {
      time: Date.now(),
      type: "token.activity",
      action,
      userId: this.userId,
      role: this.role,
      trust: this.trust,
      expired: this.isExpired(),
      valid: this.isValid(),
      status,
      ...extra
    }
    console.log("🔑 Audit Entry:", entry)
    log(entry)
    return entry
  }

  /**
   * Checks if the token is expired.
   * @returns {boolean} - True if the token is expired.
   */
  isExpired() {
    return Date.now() > this.validUntil
  }

  /**
   * Checks if the token has permission for a specific action.
   * @param {string} action - Action to check.
   * @returns {boolean} - True if the token has permission.
   */
  hasPermission(action) {
    return this.permissions.includes("*") || this.permissions.includes(action)
  }

  /**
   * Checks if the token is valid.
   * @returns {boolean} - True if the token is valid.
   */
  isValid() {
    return this.valid && !this.isExpired()
  }

  /**
   * Checks if the token has admin role.
   * @returns {boolean} - True if the token has admin role.
   */
  isAdmin() {
    return this.role === "admin"
  }

  /**
   * Checks if the token has user role.
   * @returns {boolean} - True if the token has user role.
   */
  isUser() {
    return this.role === "user"
  }

  /**
   * Checks if the token has guest role.
   * @returns {boolean} - True if the token has guest role.
   */
  isGuest() {
    return this.role === "guest"
  }

  /**
   * Returns a structured description of the JWT token.
   * @returns {Object|null} - Decoded payload or null if an error occurred.
   */
  describeJWT() {
    try {
      const parts = this.rawToken.split(".")
      if (parts.length !== 3) return null
      const payloadBase64 = parts[1]
      const decoded = JSON.parse(Buffer.from(payloadBase64, "base64").toString("utf-8"))
      return decoded
    } catch (err) {
      return null
    }
  }

  /**
   * Verifies the signature of the JWT token.
   * @param {string} secret - Secret key for signature verification.
   * @returns {boolean} - True if the signature is valid.
   */
  verifySignature(secret) {
    const parts = this.rawToken.split(".")
    if (parts.length !== 3) return false
    const data = parts[0] + "." + parts[1]
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(data)
      .digest("base64")
      .replace(/=+$/, "") // JWT base64url encoding removes padding
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
    return parts[2] === expectedSignature
  }

  /**
   * Returns a structured description of the JWT token.
   * @returns {Object|null} - Decoded payload or null if an error occurred.
   */
  describe() {
    return {
      userId: this.userId,
      role: this.role,
      trust: this.trust,
      issuedAt: this.issuedAt,
      validUntil: this.validUntil,
      permissions: this.permissions,
      expired: this.isExpired(),
      valid: this.isValid(),
    }
  }

  /**
   * Returns a string representation of the token.
   * @returns {string} - String representation of the token.
   */
  toString() {
    return `SecurityToken(${this.userId}, ${this.role}, ${this.trust})`
  }

  /**
   * Returns a JSON representation of the token.
   * @returns {Object} - JSON representation of the token.
   */
  toJSON() {
    return {
      userId: this.userId,
      role: this.role,
      trust: this.trust,
      issuedAt: this.issuedAt,
      validUntil: this.validUntil,
      permissions: this.permissions
    }
  }

  /**
   * Returns the remaining lifetime of the token.
   * @param {string} unit - Unit for output (ms, s, m, human).
   * @returns {number|string} - Remaining lifetime in the requested unit.
   */
  getRemainingLifetime(unit = "ms") {
    const now = Date.now()
    const remaining = this.validUntil - now

    if (remaining <= 0) return 0

    if (unit === "seconds") return Math.floor(remaining / 1000)
    if (unit === "minutes") return Math.floor(remaining / 60000)
    if (unit === "human") {
      const min = Math.floor(remaining / 60000)
      const sec = Math.floor((remaining % 60000) / 1000)
      return `${min}m ${sec}s`
    }

    return remaining // default: milliseconds
  }

  /**
   * Returns a structured object with information about the token.
   * @returns {Object} - Object with information about the token.
   */
  info() {
    return {
      userId: this.userId,
      role: this.role,
      trust: this.trust,
      validUntil: this.validUntil,
      permissions: this.permissions,
      expired: this.isExpired()
    }
  }
  
}

module.exports = SecurityToken