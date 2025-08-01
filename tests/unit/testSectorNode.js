// Zajisti, že test je CommonJS soubor (.js) a projekt nemá "type": "module" v package.json

const SectorNode = require("../../sectors/SectorNode")
const SecurityToken = require("../../core/security/securityToken")
const ModuleRegistry = require("../../modules/ModuleRegistry")
const ScenarioRegistry = require("../../scenarios/registry/ScenarioRegistry")

// Mockování metod registrů
ModuleRegistry.prototype.list = () => ["DataSync"]
ModuleRegistry.prototype.call = (key, token, payload) =>
  `✔️ ${key} called by ${token.userId}`

ScenarioRegistry.prototype.list = () => ["recovery", "login"]
ScenarioRegistry.prototype.activate = (name) => ({
  intent: name,
  state: "TEST"
})

// Token pro test
const token = new SecurityToken({
  userId: "USR-1499",
  role: "admin",
  trust: 0.95
})

// Vytvoření sektoru
const sector = new SectorNode({
  id: "CoreSector",
  token,
  context: {}
})

// TEST AKCE
;(async () => {
  const scenOut = await sector.activateScenario("recovery", { reason: "test" })
  console.log("🔁 Scénář výstup:", scenOut)

  const modOut = await sector.callModule("DataSync", "activateSync", { sync: true })
  console.log("🔄 Modul výstup:", modOut)

  sector.broadcast("Zdravím z CoreSectoru!")

  console.log("📜 Popis sektoru:", sector.describe())
})()