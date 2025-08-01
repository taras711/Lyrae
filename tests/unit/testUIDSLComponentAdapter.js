const UIDSLComponentAdapter = require("../../core/dsl/UIDSLComponentAdapter")

const dsl = `
panel RecoveryPanel {
  when: intent.focus == "recovery"
  show: true
}
panel AuditPanel {
  when: intent.focus == "audit"
  show: true
}
`

const context = { focus: "recovery" }

const adapter = new UIDSLComponentAdapter(dsl, context)
const active = adapter.getActivePanels()

console.log("🧠 DSL výběr komponent:")
console.log(active) // → ['RecoveryPanel']