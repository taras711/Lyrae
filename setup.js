// setup.js
const fs = require("fs")

const folders = [
  "core/lexer",
  "core/parser",
  "core/runtime",
  "core/token",
  "modules/auth",
  "modules/signal-tunnel",
  "modules/audit",
  "scenarios/admin",
  "sectors/audit-flow",
  "services/scenario-inspector",
  "components/dashboard-panel",
  "token/manager",
  "project-meta/authorship",
  "tools/cli",
  "tests/unit",
  "work"
]

folders.forEach(folder => {
  fs.mkdirSync(folder, { recursive: true })
})

console.log("✅ Project structure has been successfully initialized.")