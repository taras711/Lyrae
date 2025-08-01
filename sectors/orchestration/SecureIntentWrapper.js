/**

 * @author Starass

 * @module SecureIntentWrapper

 * @description This module handles the secure execution of intents with fallback options.

 */

const TIMEOUT_MS = 2000; // Timeout duration for intent execution

/**
 * Securely executes an intent with a fallback option.
 * @param {object} params - The parameters for the wrapper.
 * @param {object} params.intent - The main intent to execute.
 * @param {object} params.fallback - The fallback intent to execute on failure.
 * @param {object} params.token - The user token for authorization.
 * @param {object} params.logger - The logger instance.
 * @returns {object} The result of the intent execution.
 */
function secureIntentWrapper({ intent, fallback, token, logger = console }) {
  const validateSecurity = () => {
    if (token?.revoked || !token?.permissions.includes('execute_intent')) {
      throw new Error('Token not authorized');
    }
  };

  const wrap = async () => {
    try {
      validateSecurity();

      const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), TIMEOUT_MS)
      );

      const result = await Promise.race([intent.action(), timeout]);
      logger.log(`✅ Intent ${intent.id} executed securely`);
      return { result, fallbackTriggered: false };
    } catch (err) {
      logger.warn(`⚠️ Secure intent failed: ${err.message}`);
      const fallbackResult = await fallback.action();
      logger.log(`🔄 Fallback ${fallback.id} executed`);
      return { result: fallbackResult, fallbackTriggered: true };
    }
  };

  return { run: wrap };
}

module.exports = secureIntentWrapper;