class SystemStatusPanel {
  constructor(diagnostics = {}) {
    this.data = diagnostics
    this.output = []
  }

  render() {
    this.output.push(`🧠 Scenario: ${this.data.activeScenario} → ${this.data.scenarioState}`)
    this.output.push(`🔐 Role: ${this.data.tokenInfo.role} (${this.data.tokenInfo.trust})`)
    this.output.push(`🧾 Audit Mode: ${this.data.auditMode ? "Active" : "Inactive"} [${this.data.auditLogSize} entries]`)
    this.output.push(`📦 Session: ${this.data.sessionStatus}`)
    this.output.push(`🖼️ Component Active: ${this.data.component}`)

    return this.output
  }
}

module.exports = SystemStatusPanel