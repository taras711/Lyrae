const TunnelService = require("../../core/services/TunnelService")
const tunnel = new TunnelService()

tunnel.listen("alerts", (msg) => {
  console.log("🚨 Alert přijat:", msg)
})

tunnel.listen("audit", (entry) => {
  console.log("🧾 Audit vstup:", entry)
})

tunnel.send("alerts", "Token expirován u uživatele USR-1499")
tunnel.send("audit", { userId: "USR-1499", command: "diagnostics" })