/*

This test suite contains tests for the SystemDiagnostics.

*/

const SessionController = require("../../core/runtime/SessionController")
const SystemDiagnostics = require("../../core/diagnostics/SystemDiagnostics")

const controller = new SessionController({
  userId: "USR-901",
  role: "admin",
  trustScore: 0.86
})

controller.start()

const diagnostics = new SystemDiagnostics(controller)
const report = diagnostics.printSummary()

console.log("System Diagnostics:")
console.log(report.join("\n"))