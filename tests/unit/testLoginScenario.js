const LoginScenario = require("../../scenarios/login/LoginScenario")

console.log("🚀 Spouštím LoginScenario...\n")

const scenario = new LoginScenario({ session: {} })
scenario.run({ id: "USR-501", valid: true, trustScore: 0.83 })

console.log("\n📝 Log událostí:")
console.log(scenario.getLog().join("\n"))