// SecurityTokenHistory is a module that records snapshots of token states
const { getAllAttempts } = require("../../core/services/JWTSignatureAudit")
const { extractSignatureStats } = require("../../tools/JWTVerificationStats")
const { detectAnomalies } = require("../../core/services/SignatureAnomalyDetector")
const { exportAttemptsToJSON } = require("../../core/services/JWTSignatureAudit")
const fs = require("fs")

console.log("📊 Signature Stats:")
console.log(extractSignatureStats(getAllAttempts()))

console.log("🚨 Detected Anomalies:")
console.log(detectAnomalies(getAllAttempts()))

exportAttemptsToJSON("signatureAuditLog.json")
fs.writeFileSync("summaryAudit.json",
  JSON.stringify(extractSignatureStats(getAllAttempts()), null, 2)
)