// ✅ Test: testShadowReactor.js
// 📦 Umístění: tests/unit/testShadowReactor.js

const { simulateShadowSync } = require("../../core/shadow/shadowSimulator")
const { evaluateShadowResponse } = require("../../core/shadow/shadowReactor")

// Mock orchestrátor s minimální logikou
const mockOrchestrator = {
  getSectorByIntent: (intent) => {
    if (intent === "alert") return { id: "AuditCenter" }
    return null
  },
  evaluator: {
    getRule: (intent) => {
      if (intent === "alert") return { trustMin: 0.7 }
      return null
    }
  }
}

// Ghost token pro test
const ghostToken = {
  userId: "USR-2025",
  role: "observer",
  trust: 0.65,
  history: ["viewed:sector:CoreSector", "hovered:alertPayload"]
}

// Simulace synchronizace
const tunnelFrame = simulateShadowSync(ghostToken)
console.log("🌫️ ShadowTunnelFrame:", tunnelFrame)

// Evaluace reakce
const reaction = evaluateShadowResponse(tunnelFrame, mockOrchestrator)
console.log("⚡ Shadow Reaction Evaluation:", reaction)