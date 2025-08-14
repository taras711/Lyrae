/**
 * @author Starass

 * @module SessionController

 * @description This module manages user sessions, including login, logout, and scenario activation.
 * It handles user authentication, session state, and interaction with the audit and tunnel services.

 */

const fs = require("fs")
const path = require("path");
const Token = require("../token/Token")
const LoginScenario = require("../../scenarios/login/LoginScenario")
const SecurityGroup = require("../../sectors/groups/SecurityGroup")
const ActionExecutor = require("../../services/executor/ActionExecutor")
const ComponentRenderer = require("../../components/ComponentRenderer")
const AuditLogger = require("../../services/logger/AuditLogger")
const RecoveryScenario = require("../../scenarios/recovery/RecoveryScenario")
const TunnelService = require("../services/TunnelService")
const AuditService = require("../services/AuditService")

const { tokenize, parseTokens, validateAST } = require("../dsl/DSLCompiler");
const { evaluate } = require("../dsl/DSLRuntime");

class SessionController {
  constructor(userInput) {
    this.context = { session: {} } // Session context
    this.token = new Token(userInput) // User token
    this.logger = new AuditLogger() // Audit logger
    this.scenario = new LoginScenario(this.context) // Current scenario
    this.scenarioRegistry = {
        login: LoginScenario,
        recovery: RecoveryScenario, // Prepared for the future
        // tokenRefresh: TokenRefreshScenario
    }
    this.tunnel = new TunnelService() // Tunnel service
    this.audit = new AuditService() // Audit unit

    // Listening for tunnel events
    this.tunnel.listen("alerts", (msg) => {
      console.log("🚨 Alert received:", msg)
    })

    // Listening for audit events
    this.tunnel.listen("audit", (entry) => {
      this.audit.log(entry)
    })
    
  }

  /**
   * Starts the session scenario.
   */
  start() {
    this.scenario.run({
      id: this.token.userId,
      valid: this.token.trustScore > 0.1,
      trustScore: this.token.trustScore
    })

    this.tunnel.send("alerts", `User ${this.token.userId} started session like ${this.token.role}`) // Sending alert
    
    const sectorGroup = new SecurityGroup(this.context, this.token, { type: "success" })
    const actions = sectorGroup.resolveAll()

    // Audit log
    actions.forEach(msg => {
      if (msg === "ActivateAuditMode") this.token.activateAudit()
      this.logger.log({ message: msg, token: this.token, scenario: this.scenario })
    })

    const executor = new ActionExecutor(this.context, this.token) // Action executor
    executor.run(actions) // Running actions

    const renderer = new ComponentRenderer(this.context) // Component renderer
    const view = renderer.render() // Rendering component

    return {
      state: this.scenario.state,
      auditLog: this.logger.getHistory(),
      tokenInfo: this.token.info(),
      componentView: view
    }
  }

  /**
   * Logs out the user and clears the session.
   */
  logout() {
    this.context = {}
    return "Session cleared"
  }

  loadDSLScriptFor(eventName) {
    const filePath = path.join(__dirname, "../dsl/Examples", `${eventName}.lyra`);
    if(!fs.existsSync(filePath)) {
      console.error("No such file or directory ", filePath)
    }
    return fs.readFileSync(filePath, "utf-8");
  }

  handleScenarioEvent(event, context) {
    const script = this.loadDSLScriptFor(event);
    console.log("📜 LYRA Script:\n", script);

    const tokens = tokenize(script);
    console.log("🔍 Tokens:", tokens.map(t => `${t.type}: ${t.value}`));
    const ast = parseTokens(tokens);
    validateAST(ast);
    evaluate(ast, context); // spustí akci pokud podmínka platí
  }


  /**
   * Activates a session scenario.
   * @param {string} name - Scenario name.
   * @param {object} inputData - Input data for the scenario.
   * @throws {Error} If the scenario is not available.
   */
  activateScenario(name, inputData) {
    const ScenarioClass = this.scenarioRegistry[name]
    if (!ScenarioClass) throw new Error(`Scenario '${name}' is not available`)

    this.scenario = new ScenarioClass(this.context)

    if (typeof this.scenario.run === "function") {
    this.scenario.run({ 
        id: this.token.userId,
        trustScore: this.token.trustScore,
        valid: this.token.trustScore > 0.1,
        ...inputData
    })
    } else if (typeof this.scenario.mutate === "function") {
    this.scenario.mutate({ 
        id: this.token.userId,
        trustScore: this.token.trustScore,
        valid: this.token.trustScore > 0.1,
        ...inputData
    })
    } else {
        throw new Error(`Scenario '${name}' does not have a run or mutate method.`)
    }

    this.tunnel.send("audit", {
      time: new Date().toISOString(),
      scenario: name,
      userId: this.token.userId,
      trust: this.token.trustScore,
      command: `run-scenario:${name}`,
      details: inputData
    })

    return typeof this.scenario.getLog === "function"
    ? this.scenario.getLog()
    : this.scenario.reflect?.()?.log || []

  }

  /**
   * Summarizes the audit logs.
   */
  getAuditSummary() {
    return this.audit.summarize()
  }

  /**
   * Returns the audit logs.
   */
  getAuditLog(filter = {}) {
    return this.audit.getHistory(filter)
  }

}

module.exports = SessionController