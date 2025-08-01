// ✅ Test: testShadowEvaluatorHelper.js

const { processMirrorEvaluation } = require("../../core/shadow/ShadowEvaluatorHelper")

// 🔧 Mock enqueueGhostScenario pro testovací účely
const { enqueueGhostScenario } = require("../../sectors/orchestration/ghostScenarioQueue")
const originalEnqueue = enqueueGhostScenario

// 📦 Shadow historie pro logování
const shadowHistory = []

// 🎭 Ghost klient
const ghostToken = {
  userId: "USR-1499",
  role: "observer",
  trust: 0.78,
  divergence: "low"
}

// 🪞 Výstup mirror evaluace (schváleno)
const mirrorResultApproved = {
  intent: "alert",
  approved: true,
  sector: "AuditCenter",
  mirror: true,
  reason: "🪞 Shadow mirror matched role 'observer' and trust ≥ 0.7"
}

// 🪞 Výstup mirror evaluace (zamítnuto)
const mirrorResultDenied = {
  intent: "recovery",
  approved: false,
  sector: "RecoveryHub",
  mirror: true,
  reason: "🪞 No matching rule"
}

// 🧪 Test 1 – schválený intent
const result1 = processMirrorEvaluation(mirrorResultApproved, ghostToken, shadowHistory)
console.log("✅ Test 1 — doporučení:", result1.recommendation)
console.log("📝 Trace:", result1.trace)

// 🧪 Test 2 – zamítnutý intent
const result2 = processMirrorEvaluation(mirrorResultDenied, ghostToken, shadowHistory)
console.log("✅ Test 2 — doporučení:", result2.recommendation)
console.log("📝 Trace:", result2.trace)

// 📜 Shadow historie kontrola
console.log("📚 Shadow historie:", shadowHistory)