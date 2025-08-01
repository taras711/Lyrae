/**

 * @author Starass

 * @module ModuleRegistry

 * @description This module handles the registration and management of other modules.

 */

const AccessControlledModule = require("./AccessControlledModule")

class ModuleRegistry {
  /**
   * @param {Object} context – context for the module registry. Example: { userId, sectorId, ... }
   */
  constructor(context = {}) {
    this.context = context
    this.registry = {}   // { moduleName: AccessControlledModule instance }
  }

  /**
   * Registers a module instance.
   * @param {string} name 
   * @param {AccessControlledModule} moduleInstance 
   */
  registerModule(name, moduleInstance) {
    this.registry[name] = moduleInstance
  }

  /**
   * Registers a module from the given handler map
   * @param {string} name
   * @param {Object<string,Function>} handlers – map method → function
   * @param {Object<string,string[]>} permissions – map method → required permissions
   */
  register(name, handlers = {}, permissions = {}) {
    const mod = new AccessControlledModule(name)
    for (const methodName in handlers) {
      const handler = handlers[methodName]
      const perms   = permissions[methodName] || []
      mod.registerMethod(methodName, handler, perms)
    }
    this.registry[name] = mod
  }

  /**
   * Calls a method on the module. Key in the form of "ModuleName.methodName"
   * @param {string} key      – e.g. "DataSync.activateSync"
   * @param {SecurityToken} token
   * @param {Object} payload
   */
  call(key, token, payload = {}) {
    const [moduleName, methodName] = key.split(".")
    const mod = this.registry[moduleName]
    if (!mod) {
      throw new Error(`❌ Modul '${moduleName}' není registrován.`)
    }
    return mod.call(methodName, token, payload)
  }

  /**
   * @returns {string[]} list of registered modules
   */
  list() {
    return Object.keys(this.registry)
  }
}

module.exports = ModuleRegistry