
/*
This script exports a summary audit of JWT signature verification attempts.
It collects statistics and writes them to a JSON file named 'summaryAudit.json'.
*/

const { getAllAttempts } = require("../../core/services/JWTSignatureAudit")
const { extractSignatureStats } = require("../JWTVerificationStats")
const fs = require("fs")

const stats = extractSignatureStats(getAllAttempts())
fs.writeFileSync("logs/summaryAudit.json", JSON.stringify(stats, null, 2)) // Export summary audit
console.log("Stats exported:", stats)