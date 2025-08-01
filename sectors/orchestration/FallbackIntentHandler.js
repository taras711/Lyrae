/**

 * @author Starass

 * @module FallbackIntentHandler

 * @description This module handles the fallback intent logic.

 */

class FallbackIntentHandler {

  /**
   * @constructor
   * @param {Object} primary - The primary intent.
   * @param {Object} fallback - The fallback intent.
   */
  constructor({ primary, fallback }) {
    this.primary = primary;
    this.fallback = fallback;
  }

  /**
   * Runs the fallback intent handler.
   * @returns {Object} The result of the intent execution.
   */
  async run() {
    try {
      const result = await this.primary.action();
      return {
        fallbackTriggered: false,
        intentRun: this.primary.id,
        output: result
      };
    } catch (err) {
      const fallbackResult = await this.fallback.action();
      return {
        fallbackTriggered: true,
        intentRun: this.fallback.id,
        output: fallbackResult
      };
    }
  }
}

module.exports = FallbackIntentHandler;