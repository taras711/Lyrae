const SecurityToken = require("../../core/security/securityToken")
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
console.log("🧠 Tok záměru:", trace)

console.log("📜 Kompletní log:")
console.log(tracer.describeFlow())