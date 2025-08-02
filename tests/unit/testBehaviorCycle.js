/*

This test suite contains tests for the BehaviorCycle.

*/

const SessionController = require("../../core/runtime/SessionController")
const RuntimeRegistry = require("../../core/registry/RuntimeRegistry")
const CommandInterface = require("../../core/interface/CommandInterface")
const ComponentRenderer = require("../../components/ComponentRenderer")

console.log("🎯 Starting behavioral language flow...\n")

// System initialization
const controller = new SessionController({
  userId: "USR-1499",
  role: "admin",
  trustScore: 0.86
})
controller.start()

// Command interface and logger creation
const registry = new RuntimeRegistry()
const cli = new CommandInterface(controller, registry)
const logger = cli.logger

// Command sequence simulation
cli.run("run-scenario:recovery")
cli.run("diagnostics")
cli.run("get-token")
cli.run("diagnostics")
cli.run("run-scenario:recovery")

// Connect component and logger to context
controller.context.component = "RecoveryPanel"
controller.context.commandLogger = cli.logger

// Render the result
const renderer = new ComponentRenderer(controller.context)
const view = renderer.render()

console.log("Output visualization:")
console.log(view.join("\n"))

console.log("Logger contains:")
console.log(cli.logger.getHistory())
