const { detectTrustAnomalies } = require("../../core/security/analysis/TrustAnomalyDetector")
const { getHistoryForUser } = require("../../core/security/history/SecurityTokenHistory")

const userId = "USR-3090"
const history = getHistoryForUser(userId)

console.log(`📊 Analyzing trust for user: ${userId}`)
const anomalies = detectTrustAnomalies(history, 0.25, 0.25)

if (anomalies.length === 0) {
  console.log("✅ No anomalies detected.")
} else {
  anomalies.forEach(a => {
    console.log(`${a.severity} ${a.type}: ${Math.round(a.from * 100)}% → ${Math.round(a.to * 100)}% (${a.delta})`)
  })
}