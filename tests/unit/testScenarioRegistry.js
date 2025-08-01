const ScenarioRegistry = require("../../scenarios/registry/ScenarioRegistry")

const registry = new ScenarioRegistry({ userId: "USR-1499" })

const output = registry.activate("recovery", { trust: 0.86, validUntil: Date.now() + 10000 })

console.log("🔁 Aktivace scénáře:")
console.log(output)

console.log("📦 Dostupné scénáře:")
console.log(registry.list())