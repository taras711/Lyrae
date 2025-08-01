/**

 * @author Starass

 * @module AccessControlledModule

 * @description This module handles access control for various methods.

 */

class AccessControlledModule {

  /**
   * Creates an instance of the AccessControlledModule class.
   * @param {string} name - The name of the module.
   */
  constructor(name) {
    this.name = name
    this.methods = {} // { name: { handler, permissions } }
    this.log = []
  }

  /**
   * Registers a new method in the module.
   * @param {string} name - The name of the method.
   * @param {Function} handler - The function to handle the method calls.
   * @param {Array<string>} permissions - The permissions required to call the method.
   */
  registerMethod(name, handler, permissions = []) {
    this.methods[name] = { handler, permissions }
  }

  /**
   * Calls a registered method in the module.
   * @param {string} methodName - The name of the method to call.
   * @param {Object} token - The token object representing the user.
   * @param {Object} payload - The payload to pass to the method.
   * @returns {any} - The result of the method call.
   */
  call(methodName, token, payload = {}) {
    const entry = this.methods[methodName]
    if (!entry) throw new Error(`❌ Metoda '${methodName}' není registrována.`)

    if (!token || typeof token.hasPermission !== "function") {
      throw new Error(`❌ Token není platný nebo neobsahuje hasPermission.`)
    }

    const allowed = entry.permissions.some(p => token.hasPermission(p)) || token.hasPermission("*")

    if (!allowed) {
      throw new Error(`⛔ Přístup odepřen k metodě '${methodName}' pro roli '${token.role}'`)
    }

    const result = entry.handler(payload, token)
    this.log.push({
      method: methodName,
      actor: token.userId,
      role: token.role,
      time: Date.now()
    })

    return result
  }

  /**
   * Describes the module and its methods.
   * @returns {Object} - The module description.
   */
  describe() {
    return {
      module: this.name,
      availableMethods: Object.keys(this.methods),
      lastUsed: this.log.at(-1),
      callsTotal: this.log.length
    }
  }
}

module.exports = AccessControlledModule