const SessionController = require("../../core/runtime/SessionController");

const os = require("os")
const controller = new SessionController();
const pad = (n) => n.toString().padStart(2, "0");
// Simulovaný kontext
const context = {
  user: {
    role: "admin",
    name: "Taras"
  },
  users: [
    {name: "Admin", role: "admin"},
    {name: "User", role: "user"},
    {name: "Host", role: "host"}
  ],
  system: {
    admin: false,
    time: `${pad(new Date().getHours())}:${pad(new Date().getMinutes())}`
  },
  log: (msg) => console.log("[LOG]:", msg)
};

// Spusť test
controller.handleScenarioEvent("incident_flow", context);