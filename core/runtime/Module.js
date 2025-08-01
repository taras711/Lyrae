/**
 * @author Starass
 
 * @module Module

 * @description This class represents a module in the system.

 */

class Module {
  constructor(config) {
    this.name = config.name || "UnnamedModule" // Module name
    this.author = config.author || "Unknown" // Module author
    this.version = config.version || "0.1.0" // Module version
    this.access = config.access || "internal" // Access level
    this.properties = config.properties || {} // Module properties
    this.methods = {} // Module methods
  }

  /**
   * Adds a method to the module.
   * @param {string} methodName - Method name
   * @param {Object} methodDef - Method definition
   */
  addMethod(methodName, methodDef) {
    this.methods[methodName] = {
      ...methodDef,
      logic: methodDef.logic || (() => null)
    }
  }

  /**
   * Invokes a module method.
   * @param {string} methodName - Method name
   * @param {Object} args - Arguments for the method
   * @param {Object} context - Context for the method
   * @returns {any} - Result of the method invocation
   */
  invoke(methodName, args = {}, context = {}) {
    const method = this.methods[methodName]
    if (!method) throw new Error(`Method '${methodName}' does not exist in module '${this.name}'`)

    // Basic background check
    if (method.background?.contextScope === "session" && !context.session && context.session === undefined) {
      throw new Error(`Method '${methodName}' requires session context`)
    }

    return method.logic(args, context)
  }

  /**
   * Returns a module property by key.
   * @param {string} key - Property key
   * @returns {any} - Property value or undefined
   */
  getProperty(key) {
    return this.properties[key]
  }

  /**
   * Sets a module property by key.
   * @param {string} key - Property key
   * @param {any} value - Property value
   */
  setProperty(key, value) {
    this.properties[key] = value
  }

  /**
   * Returns information about the module.
   * @returns {Object} - Module information
   */
  info() {
    return {
      name: this.name,
      author: this.author,
      version: this.version,
      access: this.access,
      properties: this.properties,
      methodCount: Object.keys(this.methods).length
    }
  }
}

module.exports = Module