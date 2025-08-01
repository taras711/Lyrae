const CommandLogger = require("../../services/logger/CommandLogger")
const CommandInsights = require("../../core/insights/CommandInsights")
const BehavioralIntentPanel = require("../../components/intent/BehavioralIntentPanel")

const logger = new CommandLogger()

// Simulace příkazů
logger.log({ command: "diagnostics", result: ["..."] })
logger.log({ command: "run-scenario:recovery", result: ["..."] })
logger.log({ command: "run-scenario:recovery", result: ["..."] })
logger.log({ command: "get-token", result: ["..."] })

const insights = new CommandInsights(logger)
const panel = new BehavioralIntentPanel(insights.getSummary())

console.log("📊 Panel záměru:")
console.log(panel.render().join("\n"))