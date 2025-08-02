# 📌 Lyrae Development Sprint Board

## Sprint 1: DSL & Intent Finalization
- [ ] Extend `DSLCompiler.js` with AND/OR, negation, validation logic `#intent #dsl`
- [ ] Improve `UIDSLRuntime.checkPermissions(token)` for granular access control `#security #dsl`
- [ ] Update `/docs/DSL_Syntax.md` with examples and edge cases `#docs #dsl`
- [ ] Add tests for compound expressions and permission scenarios `#testing #dsl`

---

## Sprint 2: Scenarios & Visualization
- [ ] Refactor `ScenarioStateManager.js` for async/pause/resume support `#scenarios #controller`
- [ ] Enhance `ScenarioVisualizer.jsx` with state indicators and progress flow `#ui #scenarios`
- [ ] Expand `/docs/scenario_definitions.md` with input/output formats `#docs #scenarios`
- [ ] Extend `testSimulatedIncidentFlow.js` with failure path coverage `#testing #scenarios`

---

## Sprint 3: Modules & Sectors
- [ ] Finalize `ModuleAutoloader.js` with lazy loading and dependency injection `#modules #infra`
- [ ] Activate `ModuleAuditBridge.js` for invocation tracking `#audit #modules`
- [ ] Expand `testInterSectorProtocol.js` with edge case scenarios `#testing #sectors`
- [ ] Complete `SectorStatusPanel.jsx` with interactive controls `#ui #sectors`

---

## Sprint 4: UI & Role-Based Access
- [ ] Implement role-based rendering via `token.hasPermission()` in UI components `#security #ui`
- [ ] Refactor CLI vs React UI into unified component structure `#ui #refactor`
- [ ] Finalize `SectorFlowMonitor.jsx` with orchestration controls `#ui #orchestration`
- [ ] Add tests for permission-based UI rendering `#testing #ui`

---

## Sprint 5: Stabilization & Release Candidate
- [ ] Generate test coverage report and identify weak spots `#testing #release`
- [ ] Complete `/docs/module_api.md` with usage and examples `#docs #modules`
- [ ] Review checklist and mark all tasks as ✅ or 🔲 `#qa #release`
- [ ] Prepare changelog and release notes for RC version `#release #docs`
