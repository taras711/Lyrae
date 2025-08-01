const { detectAnomalies } = require("../../core/services/SignatureAnomalyDetector")
const { getAllAttempts } = require("../../core/services/JWTSignatureAudit")

const anomalies = detectAnomalies(getAllAttempts(), 2)
console.log("🚨 Signature Anomalies:")
console.log(anomalies)