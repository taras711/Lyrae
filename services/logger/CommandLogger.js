/**

 * @author Starass

 * @module CommandLogger

 * @description This module handles auditing of command executions.

 */

class CommandLogger {

  /**
   * Creates an instance of the CommandLogger.
   */
  constructor() {
    this.entries = []
  }

  /**
   * Logs a command execution entry.
   * @param {object} params - The parameters for the log entry.
   * @param {string} params.command - The command that was executed.
   * @param {any} params.result - The result of the command execution.
   * @param {number} [params.timestamp=Date.now()] - The timestamp for the log entry.
   */
  log({ command, result, timestamp =  Date.now() + Math.random() * 1000 }) {
    const entry = {
      time: new Date(timestamp).toISOString(),
      command,
      result: Array.isArray(result) ? result : [result]
    }
    this.entries.push(entry)
  }

  /**
   * Gets the complete command log history.
   * @returns {Array<object>} The command log entries.
   */
  getHistory() {
    return this.entries
  }

  /**
   * Filters the command log entries by command name.
   * @param {string} cmd - The command name to filter by.
   * @returns {Array<object>} The filtered command log entries.
   */
  filterByCommand(cmd) {
    return this.entries.filter(e => e.command === cmd)
  }

  /**
   * Clears the command log entries.
   */
  clear() {
    this.entries = []
  }

  /**
   * Exports the command log entries as a JSON string.
   * @returns {string} The JSON string representation of the command log entries.
   */
  exportAsJSON() {
    return JSON.stringify(this.entries, null, 2)
  }
}

module.exports = CommandLogger