/**
 * @author Starass

 * @module RuleHotReloadService

 * @description This service handles hot reloading of rules.

 */

const fs = require("fs")
const path = require("path")

let ruleCache = {} // Cache for rules

/**
 * Loads rules from a JSON file.
 * @param {string} configPath - Path to the rules file
 * @returns {Object} - Loaded rules
 */
function loadRulesFromJSON(configPath) {
  const fullPath = path.resolve(configPath)
  if (!fs.existsSync(fullPath)) throw new Error("❌ Rule config not found")

  const data = fs.readFileSync(fullPath, "utf8")
  const rules = JSON.parse(data)

  ruleCache = rules
  return ruleCache
}

/**
 * Returns a rule by key.
 * @param {string} key - Rule key
 * @returns {Object|null} - Loaded rule or null
 */
function getRule(key) {
  return ruleCache[key] || null
}

/**
 * Reloads rules from a JSON file.
 * @param {string} configPath - Path to the rules file
 * @returns {Object} - Loaded rules
 */
function reloadRules(configPath) {
  console.log("🔄 Reloading rules from:", configPath)
  return loadRulesFromJSON(configPath)
}

module.exports = {
  loadRulesFromJSON,
  getRule,
  reloadRules
}