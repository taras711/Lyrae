const CommandLogger = require("../../services/logger/CommandLogger")
const CommandInsights = require("../../core/insights/CommandInsights")

const logger = new CommandLogger()

// Simulace příkazů
logger.log({ command: "diagnostics", result: [] })
logger.log({ command: "run-scenario:recovery", result: ["..."] })
logger.log({ command: "get-token", result: ["..."] })
logger.log({ command: "run-scenario:recovery", result: ["..."] })
logger.log({ command: "diagnostics", result: ["..."] })

const insights = new CommandInsights(logger)
const summary = insights.getSummary()

console.log("🧠 Příkazová analýza:")
console.log("Celkem příkazů:", summary.totalCommands)
console.log("Nejpoužívanější:", summary.mostUsed.map(c => `${c.command} (${c.count})`).join(", "))
console.log("Poslední příkaz:", summary.lastCommandAt)
console.log("Recovery odhad:", summary.recoveryIntent)