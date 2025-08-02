/*

 It tests the tracing of intents, including the handling of security tokens and evaluator results.
 
 */

const SecurityToken = require("../../core/security/SecurityToken")
const IntentFlowTracer = require("../../sectors/orchestration/IntentFlowTracer")

const tracer = new IntentFlowTracer()

const token = new SecurityToken({ userId: "USR-1499", role: "admin", trust: 0.99 })

const evaluatorResult = {
  intent: "recovery",
  approved: false,
  sector: "CoreSector",
  reason: "No matching rule"
}

const sectorResponse = {
  status: "DENIED",
  reason: "Evaluator rejected intent"
}

const trace = tracer.traceIntent({ intent: "recovery", token, evaluatorResult, sectorResponse })
console.log("Flow of intention:", trace)

console.log("Complete log:")
console.log(tracer.describeFlow())