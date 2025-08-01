/**

 * @author Starass

 * @module RuntimeRegistry

 * @description This module provides a registry for runtime components,
 * including scenarios, modules, components, and sectors.

 */

class RuntimeRegistry {
  constructor() {
    this.scenarios = {} // Scenario registry
    this.modules = {} // Module registry
    this.components = {} // Component registry
    this.sectors = {} // Sector registry
  }

  /**
   * Registers a new component.
   * @param {string} type - Registration type (e.g. "scenario", "module", "component", "sector")
   * @param {string} name - Registration name
   * @param {Object} ref - Reference to the registered component
   */
  register(type, name, ref) {
    if (!["scenario", "module", "component", "sector"].includes(type)) {
      throw new Error(`Unknown registration type: ${type}`)
    }
    this[`${type}s`][name] = ref
  }

  /**
   * Returns a list of registered components.
   * @param {string} type - Registration type (e.g. "scenario", "module", "component", "sector")
   * @returns {Array} - List of registered components
   */
  list(type) {
    return Object.keys(this[`${type}s`] || {})
  }

  /**
   * Returns information about a registered component.
   * @param {string} type - Registration type (e.g. "scenario", "module", "component", "sector")
   * @param {string} name - Registration name
   * @returns {Object|null} - Information about the component or null if not found
   */
  info(type, name) {
    const ref = this[`${type}s`][name]
    if (!ref) return null
    if (typeof ref.info === "function") return ref.info()
    return { name, type, available: true }
  }
}

module.exports = RuntimeRegistry