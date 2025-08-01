const { simulateShadowSync } = require("../../core/shadow/shadowSimulator")

const ghostToken = {
  userId: "USR-2025",
  role: "observer",
  trust: 0.65,
  history: ["viewed:sector:CoreSector", "hovered:alertPayload"]
}

const frame = simulateShadowSync(ghostToken)
console.log("🌫️ ShadowTunnelFrame:", frame)
console.log("Predicted Intent:", frame.shadowContext.predictedIntent)
console.log("Trust Level:", frame.shadowContext.trustLevel)
console.log("Divergence Level:", frame.shadowContext.divergence)