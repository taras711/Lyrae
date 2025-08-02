/*

This test suite contains tests for the FullFlow.

*/

const Token = require("../../core/token/Token")
const LoginScenario = require("../../scenarios/login/LoginScenario")
const LoginSector = require("../../sectors/login/loginSector")
const ActionExecutor = require("../../services/executor/ActionExecutor")
const ComponentRenderer = require("../../components/ComponentRenderer")

console.log("Running FullFlow test...\n")

// Creating token
const token = new Token({
  userId: "USR-501",
  role: "admin",
  trustScore: 0.83
})

// Initializing scenario with context
const context = { session: {} }
const scenario = new LoginScenario(context)
scenario.run({ id: "USR-501", valid: true, trustScore: token.trustScore })

// Sector evaluation
const serverReply = { type: "success" }
const sector = new LoginSector(context, token)
const actions = sector.resolve(serverReply)

// Executing actions
const executor = new ActionExecutor(context, token)
const actionOutput = executor.run(actions)

// Rendering component
const renderer = new ComponentRenderer(context)
const renderOutput = renderer.render()

// Log
console.log("Log scenario:")
console.log(scenario.getLog().join("\n"))

console.log("\nActions:")
console.log(actionOutput.join("\n"))

console.log("\nComponent:")
console.log(renderOutput.join("\n"))

console.log("\nToken audit mode:", token.auditMode ? "Active" : "Inactive")