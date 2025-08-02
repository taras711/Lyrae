/*

This test suite contains tests for the IntentEvaluator.

*/

const SecurityToken = require("../../core/security/SecurityToken")
const IntentEvaluator = require("../../sectors/orchestration/IntentEvaluator")

const token = new SecurityToken({
  userId: "USR-1499",
  role: "user",
  trust: 0.65
})

const evaluator = new IntentEvaluator()
evaluator.registerRule("diagnostics", [
  { role: "admin", trustMin: 0.6, sector: "DiagnosticsUnit" },
  { role: "user", trustMin: 0.7, sector: "DiagnosticsUnit" }
])

evaluator.registerRule("audit", [
  { role: "*", trustMin: 0.5, sector: "AuditCenter" }
])

const result1 = evaluator.evaluate("diagnostics", token)
console.log("Result (diagnostics):", result1)

const result2 = evaluator.evaluate("audit", token)
console.log("Result (audit):", result2)

console.log("Defined rules:")
console.log(evaluator.describe())