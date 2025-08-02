/*

This test suite contains tests for the CommandInterface.

*/

const SessionController = require("../../core/runtime/SessionController")
const RuntimeRegistry = require("../../core/registry/RuntimeRegistry")
const CommandInterface = require("../../core/interface/CommandInterface")

const controller = new SessionController({
  userId: "USR-505",
  role: "admin",
  trustScore: 0.91
})

controller.start()

const registry = new RuntimeRegistry()
const cli = new CommandInterface(controller, registry)

console.log("Command: diagnostics")
console.log(cli.run("diagnostics").join("\n"))

console.log("\nCommand: get-token")
console.log(cli.run("get-token"))

console.log("\nCommand: get-component")
console.log(cli.run("get-component"))

console.log("\nCommand: list-scenarios")
console.log(cli.run("list-scenarios"))

console.log("\nCommand: run-scenario:recovery")
console.log(cli.run("run-scenario:recovery").join("\n"))