/**
 
 * @author Starass

 * @module SystemDiagnostics

 * @description This module provides system diagnostics for the Lyrae application.
 * It analyzes the current state of the system and provides insights into its components.

 */

class SystemDiagnostics {
  constructor(controller) {
    this.controller = controller // Reference to the controller component
  }

  /**
   * Analyzes the current state of the system and collects diagnostic information.
   * @returns {Object} - Diagnostic information about the system
   */
  analyze() {
    const { token, scenario, context, logger } = this.controller

    const diagnostics = {
      activeScenario: scenario?.constructor.name || "None", // Aktivní scénář
      scenarioState: scenario?.state || "Unknown", // Stav scénáře
      tokenInfo: token?.info() || {}, // Informace o tokenu
      auditMode: token?.auditMode || false, // Audit mód
      component: context?.component || "None", // Komponenta
      auditLogSize: logger?.getHistory()?.length || 0, // Velikost audit logu
      sessionStatus: context?.session ? "active" : "missing" // Stav session
    }

    return diagnostics // Diagnostic information about the system
  }

  /**
   * Prints a summary of the diagnostic information.
   * @returns {Array} - Summary of the diagnostic information
   */
  printSummary() {
    const summary = this.analyze()
    const output = [
      `🧠 Scenario: ${summary.activeScenario} → State: ${summary.scenarioState}`,
      `🔐 Role: ${summary.tokenInfo.role}, Trust: ${summary.tokenInfo.trust}`,
      `📦 Session: ${summary.sessionStatus}`,
      `🖼️ Component: ${summary.component}`,
      `🧾 Audit Mode: ${summary.auditMode ? "Active" : "Inactive"} (${summary.auditLogSize} records)`
    ]
    return output
  }
}

module.exports = SystemDiagnostics