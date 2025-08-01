const { getAllAttempts } = require("../../core/services/JWTSignatureAudit")
const { extractSignatureStats } = require("../../tools/JWTVerificationStats")

const stats = extractSignatureStats(getAllAttempts())
console.log("📊 Signature Stats:", stats)