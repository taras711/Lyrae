const AccessControlledModule = require("../../modules/AccessControlledModule")
const SecurityToken = require("../../core/security/securityToken")

const mod = new AccessControlledModule("DataSync")

mod.registerMethod("activateSync", (payload, token) => {
  return `🔄 Sync aktivován pro ${token.userId}`
}, ["core.sync.activate"])

mod.registerMethod("flushCache", () => {
  return "🧹 Cache vyprázdněna"
}, ["core.cache.flush"])

const token = new SecurityToken({
  userId: "USR-1499",
  role: "user",
  trust: 0.82
})

console.log(mod.call("activateSync", token))
console.log(mod.describe())