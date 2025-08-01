# System architecture

The Lyrae project is a modular platform consisting of several components that communicate with each other via a "tunnel" and an orchestrator. The main elements are:

* **TunnelService (Token Tunnel)** – provides a publish/subscribe mechanism for inter-component communication (channels such as `alerts`, `audit`, etc.). It allows sending messages between session controllers, sections and other services.
* **SessionController** – manages the user session (login, logout, scenarios) and initializes the tunnel channels (e.g. writes alerts and records to the audit). It creates a security context and runs the appropriate scenarios.
* **SectorOrchestrator and SectorNode** – ensure the routing of intents to individual sectors. `SectorOrchestrator` contains rules for mapping intents to sectors (e.g. `alert` to `AuditCenter`) and checks the level of trust. Each sector (`SectorNode`) integrates libraries of scenarios, modules and APIs. For example, `SectorNode.broadcast(message)` sends a message to all listeners of a given sector via a tunnel.
* **IntentRouter and UI DSL** – controls visual components according to user intent. `IntentRouter` collects a log of commands (`CommandInsights`) and generates a "summary" (containing e.g. focus or recoveryIntent). This is then applied to the parser of the custom UI-DSL language (loaded by `UIDSLParser`) to select active panels (evaluating `when:` expressions). This dynamically changes the UI according to the context.
* **IntentScheduler and SecureIntentWrapper** – schedule and execute powerful actions (“intents”) with support for secure processing. `IntentScheduler` queues intents and executes them in parallel up to a specified limit. For each intent, it uses `SecureIntentWrapper`, which performs the operation itself with a timeout and triggers a fallback action in case of failure. This `reactor` ensures that no intent blocks the system (see *SecureIntentWrapper*).
* **Services and Modules** – Lyrae supports dynamic registration of modules with access control (`ModuleRegistry` + `AccessControlledModule`). For example, there can be a module for data, which is assigned methods and permission roles. The modular architecture allows the platform to be extended without touching the core. There are also components such as **AuditService**, **SignatureAnomalyDetector** (detection of token signing anomalies) and **TokenLifecycleManager** for managing the lifecycle of security tokens.
* **Storage and queues** – the system maintains a persistent queue of "ghost" scenarios (`PersistentGhostQueue` and `GhostScenarioQueue`), where predictions of user actions are stored for later processing. There are also databases or JSON logs for audit and revoked tokens.

With these components, Lyrae ensures data flow according to the principles of *token tunnel*, orchestration and parallel processing (reactor) and "shadow" communication between the client and the server.

## Language syntax

Lyrae uses its own DSL primarily for defining UI components and processes. For example, UI DSL allows you to define panels like this:

```
panel RecoveryPanel {
when: intent.focus == "recovery"
show: true
}
```

* **Parser (UIDSLParser)** – parses the DSL line by line. Each `panel` creates an object with a name and properties. `when:` conditions are stored as strings, later evaluated by `UIDSLRuntime`.
* **Condition evaluation (UIDSLRuntime)** – each panel is examined at runtime: if a `when` condition is set and its logical expression evaluates to true in the context of the current intent, the panel is marked as active. This determines which components are displayed.
* **Constructs and keywords** – the basic commands in the DSL are dominant: `panel`, `when`, `show`. The condition is expressed as a logical expression, usually by comparing it to an `intent` variable (which is an object with information about the user's intent). IntentRouter also uses a similar syntax for UI rendering.
* **Intent representation** – the user's intent is not expressed directly in the language by syntax (as in classic programming languages), but is derived from the command history. For example, `CommandInsights` returns `focus` (e.g. `"recovery"`), which is then the basis for UI conditions. Thus, the intent is represented as an object and the DSL only uses it.

Lyrae does not yet have a comprehensively defined grammar for input (it does not perform syntactic analysis of input in the usual sense), but the UI DSL parser illustrates how its own syntax could be extended. Overall, the meaning of intent is understood internally from context and history, which corresponds to the principle of understanding *context and intent*.

## Security model

The basic element of security are JWT tokens and "trust" properties. Key aspects of the model:

* **SecurityToken** – the class encapsulates information about the user: `userId`, `role`, `trust`, validity, authenticationetc. The token is created and verified using `SecurityTokenLayer` (JWT with secret key). Tokens carry metadata (user ID, role, trust level) and are used for authorization.
* **Trust Supervisor** – the `TrustSupervisor` component regularly evaluates the token history and any anomalies (using `TrustAnomalyDetector`). Based on successful or rejected actions, it adjusts the trust score (`trust`) in the token. This dynamic trust model allows a user or a ghost client to gain higher or lower rights based on behavior.
* **Zero-Trust approach** – Lyrae applies the principle of “never trust, always verify”. Each operation is authorized based on the token: it is digitally signed data, its validity and trust score are checked before the action is performed. This approach corresponds to the principles of Zero-Trust (without implicit trust) – the system *“assumes breach and verifies each request”*.
* **Signal Security Layers** – each instruction or request carries metadata of origin and context. For example, when communicating between services, the user ID and role are passed. According to OWASP, it is necessary for microservices to have the caller context (user ID, role) for authorization. Lyrae implements this idea – the token carries the role and history of actions, and each sector or service can make decisions based on this data.
* **Audit and revocation** – `AuditService` records every sensitive event, the record can be exported for review. The system also allows for token revocation (`revoked_tokens.json`) and detection of signing anomalies. This complements the `trust-first` model with traceability.

Overall, Lyrae combines layers of security: it verifies JWT, maintains encrypted tokens internally, and applies least privilege policies based on the current trust level. The components ensure that the calling context (user ID) is propagated across systems, which is crucial for secure, context-aware processing.

## Shadow communication (client-server synchronization)

Lyrae supports the so-called “shadow UX” – invisible synchronization of the client and server in the background. The principle works as follows: the client (or ghost agent) periodically simulates its next step using `simulateShadowSync(ghostToken)`. This function creates a **tunnelFrame** with a predicted intent (`predictedIntent`), a confidence level, and a deviation rate. For example, a sample ghostToken with a history of actions returns a “prediction” of the next intent.
On the server, `ShadowReactor` (method `evaluateShadowResponse`) evaluates this information according to the set rules (e.g. minimum trust for the trigger). The output tells whether the server should “simulate” this scenario or just “observe”. Finally, `ShadowBridge.forwardShadowPrediction` forwards the approved predictions to the orchestrator (e.g., queues a latent "ghost" scenario). This happens completely in the background without user intervention, in the spirit of the concept of *silent UX*. (The project README describes this layer as "live, non-invasive client-server context sync".) The result is that the server can proactively prepare actions based on user behavior without the user knowing about it. (In the current version, the simulation logic is simple, but the architecture supports more advanced predictive models.)

## Semantic Analysis

Lyrae tries to understand user intent by evaluating history and context. The command history is stored by `CommandLogger`, and the `CommandInsights` class generates a summary from it (e.g., "focus" or "recoveryIntent"). This models the user intent in the form of a structured object. For example, if the most common command contains "recovery", `detectFocus()` returns `"recovery"`, which affects the UI and decision-making. This corresponds to the principle that the system focuses on *understanding intent from context*. Other inference mechanisms (e.g. `TrustSupervisor`, rules in the orchestrator) use the current state (role, error/pleasure history) to decide on the next course of action. Predictive (predictive) based on history and trust is also included - through the *intention predictor* in the shadow module, although now very simple. Overall, Lyrae combines action log analysis, user profile knowledge and security rules to understand and predict intent.

## Testability, modularity and extensibility

Lyrae is built in an object-oriented and modular way, which makes testing and extension easy. Each component has its own unit tests (directory *tests/unit*) - for example, tests of token validators, modules, intent routing and shadow components. Thanks to a clear API (classes with methods), individual layers (parser DSL, IntentRouter, SectorOrchestrator, etc.) can be tested in isolation. The platform supports plug-ins and new modules – `ModuleRegistry` allows you to add your own module with methods and assigned permissions. Scenarios are defined separately (classes in the *scenarios* folder) and can be registered in `ScenarioRegistry`. Since each part (parser, executor, security) has separate code, the system can be extended or refactored without affecting the core logic. Overall, the code shows a good division of responsibilities and clear points for extension (e.g. future support for other DSL languages, other signaling types, new scenarios).

## Complying the project principles

Lyrae declares principles such as intelligent processing, emphasis on context and predictive logic. The current implementation largely fulfills these ideas:

* **Contextual understanding:** The system models meaning from user history (commands, focus, recoveryIntent), similar to the principle of "understanding intent from context". UI DSL responds to dynamic context.
* **Multi-layer tokens:** Tokens in the system carry metadata (ID, role, action history, trust score) - each action element carries its "origin" and context (which corresponds to the concept of *Signal security layers* with contextual metadata).
* **Shadow logic and UX:** Implementation of simulation and synchronization of "shadow" scenarios allows for the transfer of action suggestions to the server in a silent way, as the project intends ("non-invasive client-server context sync").
* **Predictive Processing:** Lyrae works with historical data and confidence scores to predict future intents (e.g. `intentPredictor`) – this corresponds to the idea of "predictive tunneling" (operationally on hypothetical futures).

The documentation shows that some features are in an early state (e.g. full CLI/debug support, some planned modules are missing). But the basic intelligence, context logic and security layer works as designed.

## Suggestions for improvements and next phases

A few possible improvements emerge from the analysis:

* **Language Parser:** Extend the DSL parser for the main language (so far it is minimalistic, just UI DSL). A grammar for expressing intents or other domain operations could be formalized here.
* **TunnelService Architecture:** Currently each instance has its own communication channels; consider centralized or distributed messaging (e.g. via message broker) for a true multi-client/server environment.
* **Shadow module:** The operational logic of "shadow" synchronization can be extended with real asynchronous transfers to the server (e.g. WebSocket) and more complex prediction algorithms (e.g. machine learning). The orchestrator should also have a function for preparing (and running) approved ghost scenarios.
* **Security:** Add audit end-to-end encryption between components or multi-layer authentication (mTLS) for higher robustness. Introduce compliance with Zero-Trust standards (e.g. regularly check the validity of the token with the CA, integrate multi-factor authentication).
* **Refactoring and optimization:** Some services (e.g. simulator and shadow evaluator) could be optimized and unified. It is also possible to divide large classes into smaller ones and add more detailed error handling.
* **Tests and documentation:** Expand test scenarios (e.g. client-server integration tests), supplement the DSL and security policy documentation.

Overall, the Lyrae project is in active development and has a solid architecture for intent processing and secure communication. Proposed improvements would improve scalability, security, and usability (e.g., more robust UI DSL, more advanced predictive models) for future development phases.

**Sources:** The architecture and principles are based on project documentation (README articles, MD files) and generally accepted principles (e.g., Zero Trust, context propagation in microservices, importance of context-semantic processing).