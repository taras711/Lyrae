const Token = require("../../core/token/Token")
const LoginScenario = require("../../scenarios/login/LoginScenario")
const AuditLogger = require("../../services/logger/AuditLogger")

console.log("📄 Testuji AuditLogger...\n")

const token = new Token({
  userId: "USR-404",
  role: "user",
  trustScore: 0.29
})

const scenario = new LoginScenario({ session: {} })
scenario.run({ id: "USR-404", valid: true, trustScore: token.trustScore })

const logger = new AuditLogger()

logger.log({
  message: "Scénář zamčen kvůli nízkému trustScore",
  token,
  scenario
})

logger.log({
  message: "Token vyžaduje auditní režim",
  token,
  scenario
})

console.log("🧾 Historie auditních záznamů:")
console.log(logger.getHistory())