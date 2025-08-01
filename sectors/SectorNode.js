/**

 * @author Starass

 * @module SectorNode

 * @description This module handles the creation and management of sector nodes.

 */

const TunnelService = require("../core/services/TunnelService");
const AuditService = require("../core/services/AuditService");
const ScenarioRegistry = require("../scenarios/registry/ScenarioRegistry");
const ModuleRegistry = require("../modules/ModuleRegistry"); // připravíme dále

class SectorNode {

  /**
   * Creates an instance of the SectorNode.
   * @param {object} params - The parameters for the sector node.
   * @param {string} params.id - The ID of the sector.
   * @param {object} params.token - The token for the sector.
   * @param {object} [params.context={}] - The context for the sector.
   */
  constructor({ id, token, context = {} }) {
    this.id = id;
    this.token = token;
    this.context = { ...context, sectorId: id };
    this.tunnel = new TunnelService();
    this.audit = new AuditService();
    this.scenarios = new ScenarioRegistry(this.context);
    this.modules = new ModuleRegistry(this.context);

    // poslech systémových zpráv pro tento sektor
    this.tunnel.listen(`sector.${this.id}`, msg => {
      console.log(`📩 [${this.id}] zpráva:`, msg);
    });
  }


  /**
   * Registers a scenario for the sector.
   * @param {string} intent - The intent of the scenario.
   * @param {class} ScenarioClass - The scenario class to register.
   */
  registerScenario(intent, ScenarioClass) {
   this.scenarios.register(intent, ScenarioClass);
  }

  /**
   * Activates a scenario in this sector.
   * @param {string} name - The name of the scenario to activate.
   * @param {object} [payload={}] - The payload to pass to the scenario.
   * @returns {object} The summary of the activated scenario.
   */
  async activateScenario(name, payload = {}) {
    const summary = this.scenarios.activate(name, payload);
    this.audit.log({
      sector: this.id,
      scenario: name,
      command: `activateScenario:${name}`,
      userId: this.token.userId,
      trust: this.token.trust,
      details: payload
    });
    return summary;
  }

  /**
   * Calls a method on a module in this sector.
   * @param {string} moduleName - The name of the module.
   * @param {string} methodName - The name of the method to call.
   * @param {object} [payload={}] - The payload to pass to the method.
   * @returns {object} The result of the module method call.
   */
  async callModule(moduleName, methodName, payload = {}) {
    const result = this.modules.call(`${moduleName}.${methodName}`, this.token, payload);
    this.audit.log({
      sector: this.id,
      module: moduleName,
      method: methodName,
      userId: this.token.userId,
      trust: this.token.trust,
      details: payload
    });
    return result;
  }

  /**
   * Broadcasts a message to the tunnel.
   * @param {object} message - The message to broadcast.
   */
  broadcast(message) {
    this.tunnel.broadcast({
      sector: this.id,
      message
    });
  }

  /**
   * Describes the sector node.
   * @returns {object} The description of the sector node.
   */
  describe() {
    return {
      sectorId: this.id,
      token: this.token.info(),
      scenarios: this.scenarios.list(),
      modules: this.modules.list(),
      auditSummary: this.audit.summarize()
    };
  }
}

module.exports = SectorNode;