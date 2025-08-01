/**

 * @author Starass

 * @module ScenarioRegistry

 * @description This module handles the registration and activation of scenarios.

 */

const RecoveryScenario = require("../recovery/RecoveryScenario")
const LoginScenario = require("../login/LoginScenario")

class ScenarioRegistry {

  /**
   * Creates an instance of the ScenarioRegistry class.
   * @param {Object} controllerContext - The context for the controller.
   */
  constructor(controllerContext = {}) {
    this.context = controllerContext
    this.registry = {
      recovery: RecoveryScenario,
      login: LoginScenario
      // další scénáře lze přidat zde
    }
    this.instances = {}
  }

  /**
   * Registers a new scenario.
   * @param {string} intent - The intent of the scenario.
   * @param {Function} ScenarioClass - The scenario class to register.
   */
  register(intent, ScenarioClass) {
    this.registry[intent] = ScenarioClass
  }

  /**
   * Activates a registered scenario.
   * @param {string} name - The name of the scenario to activate.
   * @param {Object} payload - The payload for the scenario.
   * @returns {Promise<Object>} The result of the scenario activation.
   */
  async activate(name, payload = {}) {
    const ScenarioClass = this.registry[name]
    if (!ScenarioClass) {
      throw new Error(`❌ Scénář '${name}' není registrován.`)
    }

    const instance = new ScenarioClass(this.context)

    if (typeof instance.run === "function") {
      const result = await instance.run(payload)
      this.instances[name] = instance
      return result
    }

    // Fallback — pokud scénář nemá run()
    this.instances[name] = instance
    return typeof instance.reflect === "function"
      ? instance.reflect()
      : { status: instance.state || "OK", result: "Scénář proběhl bez reflexe." }
  }

  /**
   * Gets a registered scenario instance.
   * @param {string} name - The name of the scenario to get.
   * @returns {Object|null} The scenario instance or null if not found.
   */
  get(name) {
    return this.instances[name] || null
  }

  /**
   * Lists all registered scenario names.
   * @returns {Array<string>} The list of registered scenario names.
   */
  list() {
    return Object.keys(this.registry)
  }
}

module.exports = ScenarioRegistry