// ✅ Test: testShadowEvaluatorMirror.js
// 📦 Umístění: tests/unit/testShadowEvaluatorMirror.js

const { createShadowMirror } = require("../../core/shadow/ShadowEvaluatorMirror")

console.log("🧪 Testuji ShadowEvaluatorMirror...")

// 🔧 Mock IntentEvaluator.describe()
const mockDescribeRules = () => ({
  alert: [
    { role: "observer", trustMin: 0.7, sector: "AuditCenter" },
    { role: "admin", trustMin: 0.6, sector: "ControlTower" }
  ],
  recovery: [
    { role: "admin", trustMin: 0.5, sector: "RecoveryHub" }
  ]
})

// 🧭 Vytvoření shadow mirror evaluátoru
const shadowEvaluator = createShadowMirror(mockDescribeRules)

// 🎭 Ghost token (client)
const ghostClient = {
  userId: "USR-1499",
  role: "observer",
  trust: 0.75
}

// 🧪 Test intentu: 'alert'
const alertEval = shadowEvaluator.mirrorEvaluate("alert", ghostClient)
console.log("⚡ Výsledek evaluace pro 'alert':", alertEval)

// 🧪 Test intentu: 'recovery'
const recoveryEval = shadowEvaluator.mirrorEvaluate("recovery", ghostClient)
console.log("⚡ Výsledek evaluace pro 'recovery':", recoveryEval)