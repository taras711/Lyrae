const Token = require("../../core/token/Token")
const LoginScenario = require("../../scenarios/login/LoginScenario")
const AuditSector = require("../../sectors/audit/AuditSector")
const AuditLogger = require("../../services/logger/AuditLogger")
const ComponentRenderer = require("../../components/ComponentRenderer")

console.log("🧪 Spouštím AuditFlow...\n")

// 1️⃣ Token s nízkým trustem
const token = new Token({
  userId: "USR-999",
  role: "user",
  trustScore: 0.29
})

// 2️⃣ Spuštění scénáře
const context = { session: {} }
const scenario = new LoginScenario(context)
scenario.run({ id: "USR-999", valid: true, trustScore: token.trustScore })

// 3️⃣ Audit sektor analyzuje log scénáře
const auditSector = new AuditSector(context, token, scenario.getLog())
const auditActions = auditSector.resolve()

// 4️⃣ Audit logger zpracuje akce
const logger = new AuditLogger()
auditActions.forEach(msg => {
  logger.log({ message: msg, token, scenario })
})

// 5️⃣ Komponenta reaguje na auditní režim
const renderer = new ComponentRenderer(context)
const output = renderer.render()

// 📋 Výpis
console.log("📋 Auditní záznamy:")
console.log(logger.exportAsJSON())

console.log("\n🖼️ Vizualizace komponenty:")
console.log(output.join("\n"))

console.log("\n🔐 Token audit mode:", token.auditMode ? "✅ Aktivní" : "❌ Neaktivní")