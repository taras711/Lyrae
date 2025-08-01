/**

 * RuntimeConsole - Component for displaying runtime console

 * @param {*} param0 - Component props

 * @returns {JSX.Element} - Rendered component element

 * @description This component displays a runtime console for interacting with user commands.

 */

class RuntimeConsole {
  constructor(commandInterface) {
    this.cli = commandInterface
  }

  execute(command) {
    const result = this.cli.run(command)
    if (Array.isArray(result)) {
      return result.map(line => `• ${line}`)
    } else if (typeof result === "object") {
      return Object.entries(result).map(([key, val]) => `🔹 ${key}: ${val}`)
    } else {
      return [`📣 ${result}`]
    }
  }

  render(command) {
    const output = this.execute(command)
    return [`📦 Output of command "${command}":`, ...output]
  }
}

module.exports = RuntimeConsole