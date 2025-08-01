/**

 * @author Starass

 * @module IntentSandboxRunner

 * @description This module handles the sandboxing and simulation of intent execution.

 */

class IntentSandboxRunner {

  /**
   * @constructor
   * @param {Array} intents - The list of intents to simulate.
   * @param {Object} options - Options for the sandbox runner.
   */
  constructor(intents, options = {}) {
    this.intents = intents;
    this.mode = options.mode || 'isolation';
    this.logger = options.logger || console.log;
    this.mockResponses = options.mockResponses || {};
  }

  /**
   * Runs the sandbox simulation.
   * @returns {Promise<void>}
   */
  async run() {
    this.logger(`Sandbox mode: ${this.mode}`);
    for (const intent of this.intents) {
      try {
        const result = await this.mockRun(intent);
        this.logger(`✅ Intent ${intent.id} simulated:`, result);
      } catch (err) {
        this.logger(`❌ Intent ${intent.id} failed:`, err.message);
      }
    }
  }

  /**
   * Mocks the execution of an intent.
   * @param {Object} intent - The intent to simulate.
   * @returns {Promise<Object>} The simulated result.
   */
  async mockRun(intent) {
    if (this.mode === 'stress') {
      // Simulate higher load or delay
      await this.simulateDelay();
    }
    if (this.mockResponses[intent.id]) {
      return this.mockResponses[intent.id];
    }
    return intent.action(); // fallback to original function
  }

  /**
   * Simulates a delay.
   * @param {number} ms - The delay duration in milliseconds.
   * @returns {Promise<void>}
   */
  async simulateDelay(ms = 100 + Math.random() * 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = IntentSandboxRunner;