/**

 * @author Starass

 * @module CommandInterface

 * @description This class handles command processing.

 */

const SystemDiagnostics = require("../diagnostics/SystemDiagnostics")
const CommandLogger = require("../../services/logger/CommandLogger")

class CommandInterface {
  constructor(controller, registry) {
    this.controller = controller // Store reference to the controller
    this.registry = registry // Store command registry
    // Initialize supported commands
    this.supportedCommands = [
      "diagnostics", // System diagnostics
      "get-token", // Get token
      "get-component", // Get component
      "logout", // Logout
      "list-scenarios", // List scenarios
      "run-scenario:login", // Run login scenario
      "run-scenario:recovery" // Run recovery scenario
    ]
    this.logger = new CommandLogger() // Initialize command logger

  }

  /**
   * Starts command processing.
   * @param {string} command - Command to execute
   * @returns {string} - Result of command execution
   */
  run(command) {
    if (!this.supportedCommands.includes(command)) {
        const result = `❌ Unknown command: ${command}`
        this.logger.log({ command, result })
        return result
    }

    let result

    switch (command) {
        case "diagnostics": {
        const diag = new SystemDiagnostics(this.controller)
        result = diag.printSummary()
        break
        }

        case "get-token":
        result = this.controller.token.info()
        break

        case "get-component":
        result = this.controller.context.component || "❓ No active component"
        break

        case "logout":
        result = this.controller.logout()
        break

        case "list-scenarios":
        result = Object.keys(this.controller.scenarioRegistry)
        break

        case "run-scenario:login":
        result = this.controller.activateScenario("login", { valid: true })
        break

        case "run-scenario:recovery":
        result = this.controller.activateScenario("recovery", {
            tokenValid: true,
            userKnown: true
        })
        break

        default:
        result = "⛔ Command not implemented."
    }

    this.logger.log({ command, result })
    return result
  }

  /**
   * Returns help for available commands.
   * @returns {Array} - List of available commands
   */
  help() {
    return this.supportedCommands.map(cmd => `• ${cmd}`)
  }
}

module.exports = CommandInterface