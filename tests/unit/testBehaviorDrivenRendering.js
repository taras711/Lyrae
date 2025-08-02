/*

This test suite contains tests for the BehaviorDrivenRendering.

*/

const SessionController = require("../../core/runtime/SessionController")
const RuntimeRegistry = require("../../core/registry/RuntimeRegistry")
const CommandInterface = require("../../core/interface/CommandInterface")
const ComponentRenderer = require("../../components/ComponentRenderer")

console.log("Starting behavior-driven flow...\n")

// Start controller
const controller = new SessionController({
  userId: "USR-1001",
  role: "admin",
  trustScore: 0.83
})

controller.start()

// Create interface and logger
const registry = new RuntimeRegistry()
const cli = new CommandInterface(controller, registry)
const logger = cli.logger

// Command sequence simulation
cli.run("run-scenario:recovery")
cli.run("diagnostics")
cli.run("get-token")
cli.run("run-scenario:recovery")
cli.run("list-scenarios")

// Render component based on intent
controller.context.commandLogger = logger
controller.context.component = "RecoveryPanel"

const renderer = new ComponentRenderer(controller.context)
const output = renderer.render()

// Output display
console.log("Output visualization:")
console.log(output.join("\n"))