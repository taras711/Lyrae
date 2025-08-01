
/**

 * @author Starass

 * @module RuleHotReloadService

 * @description This module provides hot-reloading capabilities for rule configurations.

 */

let ruleCache = {}; // Cache for rules

/**
 * Load rules from a JSON file.
 * @param {string} configPath - The path to the config file.
 * @returns {Promise<Object>} - A promise that resolves to the loaded rules.
 */
async function loadRulesFromJSON(configPath) {
  const response = await fetch(configPath);
  const rules = await response.json();
  if (!rules) throw new Error("❌ Rule config not found");
  const data = rules(await response.text());
  if (!data) throw new Error("❌ Rule config not found");

  ruleCache = rules
  return ruleCache
}

/**
 * Get a rule by its key.
 * @param {string} key - The key of the rule.
 * @returns {Object|null} - The rule object or null if not found.
 */
function getRule(key) {
  return ruleCache[key] || null
}

/**
 * Reload the rules from the config file.
 * @param {string} configPath - The path to the config file.
 * @returns {Promise<Object>} - A promise that resolves to the reloaded rules.
 */
function reloadRules(configPath) {
  console.log("🔄 Reloading rules from:", configPath)
  return loadRulesFromJSON(configPath)
}

export {
  loadRulesFromJSON,
  getRule,
  reloadRules
}