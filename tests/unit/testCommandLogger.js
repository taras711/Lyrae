/*

This test suite contains tests for the CommandLogger.

*/

const SessionController = require("../../core/runtime/SessionController")
const RuntimeRegistry = require("../../core/registry/RuntimeRegistry")
const CommandInterface = require("../../core/interface/CommandInterface")
const CommandLogger = require("../../services/logger/CommandLogger")

const controller = new SessionController({
  userId: "USR-707",
  role: "user",
  trustScore: 0.73
})

controller.start()

const registry = new RuntimeRegistry()
const cli = new CommandInterface(controller, registry)
const logger = new CommandLogger()

const commands = ["diagnostics", "get-token", "list-scenarios"]

commands.forEach(cmd => {
  const result = cli.run(cmd)
  logger.log({ command: cmd, result })
})

console.log("Command History:")
console.log(logger.exportAsJSON())