const Token = require("../../core/token/Token")
const LoginScenario = require("../../scenarios/login/LoginScenario")
const AuditSector = require("../../sectors/audit/AuditSector")
const AuditLogger = require("../../services/logger/AuditLogger")
const ComponentRenderer = require("../../components/ComponentRenderer")

console.log("🚨 Simuluji incidentní tok...\n")

// 1️⃣ Rizikový token
const token = new Token({
  userId: "USR-777",
  role: "user",
  trustScore: 0.21
})

// 2️⃣ Scénář spadne do LOCKED
const context = { session: {} }
const scenario = new LoginScenario(context)
scenario.run({ id: "USR-777", valid: false, trustScore: token.trustScore })

// 3️⃣ Audit sektor reaguje na incident
const auditSector = new AuditSector(context, token, scenario.getLog())
const auditActions = auditSector.resolve()

// 4️⃣ Auditní logger aktivuje záznamy
const logger = new AuditLogger()
auditActions.forEach(msg => {
  if (msg === "ActivateAuditMode") token.activateAudit()
  logger.log({ message: msg, token, scenario })
})

// 5️⃣ Renderer zobrazí odpověď
context.component = "AccessDenied" // nastavíme ručně podle očekávané reakce
const renderer = new ComponentRenderer(context)
const visual = renderer.render()

// 🔍 Výstup
console.log("📋 Auditní záznamy:")
console.log(logger.exportAsJSON())

console.log("\n🖼️ Vizualizace:")
console.log(visual.join("\n"))

console.log("\n🔐 Audit režim:", token.auditMode ? "✅ Aktivní" : "❌ Neaktivní")