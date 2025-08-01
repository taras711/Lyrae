
// Summary Audit
const { getAllAttempts } = require("../../core/services/JWTSignatureAudit")
const { extractSignatureStats } = require("../JWTVerificationStats")
const fs = require("fs")

const stats = extractSignatureStats(getAllAttempts())
fs.writeFileSync("summaryAudit.json", JSON.stringify(stats, null, 2)) // Export summary audit
console.log("📦 Stats exported:", stats)