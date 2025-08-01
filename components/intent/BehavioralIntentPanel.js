/**

 * BehavioralIntentPanel - Component for displaying user behavioral intent

 * @param {*} param0 - Component props

 * @returns {JSX.Element} - Rendered component element

 * @description This component displays user behavioral intent based on the analysis of their commands.

 */

class BehavioralIntentPanel {
  constructor(intentData = {}) {
    this.data = intentData
    this.output = []
  }

  render() {
    this.output.push("🧠 Predikovaný záměr uživatele:")

    this.output.push(`• Last Command At: ${this.data.lastCommandAt}`)
    this.output.push(`• Recovery Intent: ${this.data.recoveryIntent}`)

    const mostUsed = this.data.mostUsed || []
    if (mostUsed.length) {
      const top = mostUsed.map(c => `${c.command} (${c.count}×)`)
      this.output.push("• Most Used Commands: " + top.join(", "))
    }

    this.output.push(`• Total Commands in Session: ${this.data.totalCommands}`)

    return this.output
  }
}

module.exports = BehavioralIntentPanel