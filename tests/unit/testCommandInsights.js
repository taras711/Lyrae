/*

This test suite contains tests for the CommandInsights.

*/

const CommandLogger = require("../../services/logger/CommandLogger")
const CommandInsights = require("../../core/insights/CommandInsights")

const logger = new CommandLogger()

// Command simulation
logger.log({ command: "diagnostics", result: [] })
logger.log({ command: "run-scenario:recovery", result: ["..."] })
logger.log({ command: "get-token", result: ["..."] })
logger.log({ command: "run-scenario:recovery", result: ["..."] })
logger.log({ command: "diagnostics", result: ["..."] })

const insights = new CommandInsights(logger)
const summary = insights.getSummary()

console.log("Command Insights:")
console.log("Total commands:", summary.totalCommands)
console.log("Most used:", summary.mostUsed.map(c => `${c.command} (${c.count})`).join(", "))
console.log("Last command:", summary.lastCommandAt)
console.log("Recovery estimate:", summary.recoveryIntent)