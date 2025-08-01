/**

 * @author Starass

 * @module ActionExecutor

 * @description This module handles the execution of actions within a sector.

 */

class ActionExecutor {

  /**
   * Creates an instance of the ActionExecutor.
   * @param {object} context - The context for the action executor.
   * @param {object} token - The token for the action executor.
   */
  constructor(context = {}, token = null) {
    this.context = context
    this.token = token
    this.output = []
  }

  /**
   * Runs a series of actions.
   * @param {Array<string>} actions - The list of actions to run.
   * @returns {Array<string>} The output messages from the actions.
   */
  run(actions = []) {
    actions.forEach(action => {
      switch (action) {
        case "EnableDashboard":
          this.output.push("Showing DashboardPanel...")
          this.context.component = "DashboardPanel"
          break

        case "LoadAdminPanel":
          this.output.push("Loading AdminPanel...")
          // Simulate loading admin data
          this.context.auditLoaded = true
          break

        case "EnableRestrictedPanel":
          this.output.push("Showing RestrictedView component...")
          this.context.component = "RestrictedView"
          break

        case "BlockAccess":
          this.output.push("Showing AccessDenied component...")
          this.context.component = "AccessDenied"
          break

        case "ActivateAuditMode":
          this.output.push("Activating audit mode...")
          if (this.token) this.token.activateAudit()
          break

        default:
          this.output.push(`No action found for: ${action}`)
      }
    })

    return this.output
  }

  /**
   * Gets the current state of the action executor.
   * @returns {object} The current state of the action executor.
   */
  getState() {
    return this.context
  }
}

module.exports = ActionExecutor