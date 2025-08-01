const RuntimeRegistry = require("../../core/registry/RuntimeRegistry")
const AuthCenter = require("../../modules/auth/AuthCenter")
const LoginScenario = require("../../scenarios/login/LoginScenario")

const registry = new RuntimeRegistry()

registry.register("module", "AuthCenter", AuthCenter)
registry.register("scenario", "Login", LoginScenario)

console.log("✅ Modul info:")
console.log(registry.info("module", "AuthCenter"))

console.log("🧬 Scénáře:")
console.log(registry.list("scenario"))