# 📘 Project Documentation

## 📄 File: `./config.js`


### 📝 Documentation Blocks:
> * @module config
> * @description Configuration settings for the LyraeLangProject.


---
## 📄 File: `./lyrae.js`


### 📝 Documentation Blocks:
> * Starts the Lyrae environment.


---
## 📄 File: `./components\ComponentRenderer.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @description Renders various components based on the context

> * @param {*} context - The rendering context

> * Renders the component output
> * @returns {Array} - The rendered output


---
## 📄 File: `./components\gui\MirrorTracePanel.js`


### 📝 Documentation Blocks:
> * MirrorTracePanel - Component for displaying shadow trace records
> * @param {*} param0 - Component props
> * @returns {JSX.Element} - Rendered component element
> * @description This component displays shadow trace records with information about intent, source, sector, and trust.
> * Records are sorted by time and display approval or denial of the record.
> * Each record includes a reason for approval/denial and other metadata.


---
## 📄 File: `./components\gui\ScenarioVisualizer.js`


### 📝 Documentation Blocks:
> * ScenarioVisualizer - C
> * @param {*} param0 - Component props
> * @returns {JSX.Element} - Rendered component element
> * @description This component visualizes a scenario and its metadata.


---
## 📄 File: `./components\intent\BehavioralIntentPanel.js`


### 📝 Documentation Blocks:
> * BehavioralIntentPanel - Component for displaying user behavioral intent
> * @param {*} param0 - Component props
> * @returns {JSX.Element} - Rendered component element
> * @description This component displays user behavioral intent based on the analysis of their commands.


---
## 📄 File: `./components\runtime\RuntimeConsole.js`


### 📝 Documentation Blocks:
> * RuntimeConsole - Component for displaying runtime console
> * @param {*} param0 - Component props
> * @returns {JSX.Element} - Rendered component element
> * @description This component displays a runtime console for interacting with user commands.


---
## 📄 File: `./core\cache\PersistentGhostManager.js`


### 📝 Documentation Blocks:
> * @author Starass
> * This module manages and manipulates a queue of ghosts,
> * which stores user intents for later processing.
> * @module PersistentGhostManager
> * @description This module manages and manipulates a queue of ghosts,
> * which stores user intents for later processing.

> *  Reset the intent queue
> *  This function clears all intents in the queue and resets it to empty.
> *  It is used, for example, when restarting the application or when clearing the queue.
> *  @returns {void}

> * Load the intent queue
> * @returns {Array} - Array of intents

> * Load an intent by ID
> * @param {*} id - ID of the intent
> * @returns {Object|null} - Found intent or null

> * Remove an intent by ID
> * @param {*} id - ID of the intent

> * Get the count of intents
> * @returns {number} - Number of intents in the queue

> * Get intents by type
> * @param {*} type - Type of the intent
> * @returns {Array} - Array of intents

> * Get intents by priority
> * @param {*} priority - Priority of the intent
> * @returns {Array} - Array of intents

> * Get intents by retry status
> * @param {*} retries - Retry status of the intent
> * @returns {Array} - Array of intents

> * Get intents by action
> * @param {*} action - Action of the intent
> * @returns {Array} - Array of intents

> * Get intents by target
> * @param {*} target - Target of the intent
> * @returns {Array} - Array of intents

> * Get intents by user ID
> * @param {*} userId - User ID
> * @returns {Array} - Array of intents

> * Get intents by timestamp
> * @param {*} timestamp - Timestamp of the intent
> * @returns {Array} - Array of intents

> * Get intents by user ID pattern
> * @param {*} userId - User ID
> * @returns {Array} - Array of intents

> * Get intents by action ID
> * @param {*} actionId - Action ID
> * @returns {Array} - Array of intents

> * Get intents by target ID
> * @param {*} targetId - Target ID
> * @returns {Array} - Array of intents

> * Get intents by priority ID
> * @param {*} priorityId - Priority ID
> * @returns {Array} - Array of intents

> * Get intents by retries ID
> * @param {*} retriesId - Retries ID
> * @returns {Array} - Array of intents

> * Get intents by timestamp ID
> * @param {*} timestampId - Timestamp ID
> * @returns {Array} - Array of intents

> * Get intents by type ID
> * @param {*} typeId - Type ID
> * @returns {Array} - Array of intents


---
## 📄 File: `./core\cache\PersistentGhostQueue.js`


### 📝 Documentation Blocks:
> * @module PersistentGhostQueue
> * @description This component manages and manipulates a queue of ghosts,
> * which stores user intents for later processing.

> * Save the queue to localStorage
> * @param {Array} queue - Array of intents

> * Load the intent queue
> * @returns {Array} - Array of intents

> * Clear the intent queue
> * @returns {void}


---
## 📄 File: `./core\devtools\GhostIntentFeeder.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module GhostIntentFeeder
> * @description This component is responsible for generating and feeding test intents into the ghost queue.

> * Generate a test intent
> * @param {number} i - Intent index
> * @returns {Object} - Created intent

> * Main function for feeding the ghost queue
> * @param {number} count - Number of intents to generate


---
## 📄 File: `./core\diagnostics\SystemDiagnostics.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module SystemDiagnostics
> * @description This module provides system diagnostics for the Lyrae application.
> * It analyzes the current state of the system and provides insights into its components.

> * Analyzes the current state of the system and collects diagnostic information.
> * @returns {Object} - Diagnostic information about the system

> * Prints a summary of the diagnostic information.
> * @returns {Array} - Summary of the diagnostic information


---
## 📄 File: `./core\dsl\UIDSLComponentAdapter.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module UIDSLComponentAdapter
> * @description This module provides an adapter for UIDSL components.

> * Gets active panels from the DSL.
> * @returns {Array} - List of active panels


---
## 📄 File: `./core\dsl\UIDSLParser.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module UIDSLParser
> * @description This module provides a parser for UIDSL.

> * Parses the UIDSL source code.
> * @returns {Array} - List of panels
> * @description This method parses the UIDSL source code and returns a list of panels.


---
## 📄 File: `./core\insights\CommandInsights.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module CommandInsights
> * @description This class provides insights into user commands and their context.

> * Returns the timestamp of the last command.
> * @returns {string} - Timestamp of the last command

> * Returns the most common commands.
> * @returns {Array} - List of most common commands

> * Detects user intent based on command history.
> * @returns {string} - User intent

> * Detects recovery intent based on command history.
> * @returns {string} - Recovery intent

> * Returns a summary of command insights.
> * @returns {Object} - Summary of command insights


---
## 📄 File: `./core\interface\CommandInterface.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module CommandInterface
> * @description This class handles command processing.

> * Starts command processing.
> * @param {string} command - Command to execute
> * @returns {string} - Result of command execution

> * Returns help for available commands.
> * @returns {Array} - List of available commands


---
## 📄 File: `./core\registry\RuntimeRegistry.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module RuntimeRegistry
> * @description This module provides a registry for runtime components,
> * including scenarios, modules, components, and sectors.

> * Registers a new component.
> * @param {string} type - Registration type (e.g. "scenario", "module", "component", "sector")
> * @param {string} name - Registration name
> * @param {Object} ref - Reference to the registered component

> * Returns a list of registered components.
> * @param {string} type - Registration type (e.g. "scenario", "module", "component", "sector")
> * @returns {Array} - List of registered components

> * Returns information about a registered component.
> * @param {string} type - Registration type (e.g. "scenario", "module", "component", "sector")
> * @param {string} name - Registration name
> * @returns {Object|null} - Information about the component or null if not found


---
## 📄 File: `./core\router\IntentRouter.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module IntentRouter
> * @description This class routes user intent based on command insights and UIDSL components.

> * Routes intent based on context and active panels.
> * @returns {Object} - Object containing intent and active panels


---
## 📄 File: `./core\rules\RuleHotReloadService.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module RuleHotReloadService
> * @description This service handles hot reloading of rules.

> * Loads rules from a JSON file.
> * @param {string} configPath - Path to the rules file
> * @returns {Object} - Loaded rules

> * Returns a rule by key.
> * @param {string} key - Rule key
> * @returns {Object|null} - Loaded rule or null

> * Reloads rules from a JSON file.
> * @param {string} configPath - Path to the rules file
> * @returns {Object} - Loaded rules


---
## 📄 File: `./core\runtime\Module.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module Module
> * @description This class represents a module in the system.

> * Adds a method to the module.
> * @param {string} methodName - Method name
> * @param {Object} methodDef - Method definition

> * Invokes a module method.
> * @param {string} methodName - Method name
> * @param {Object} args - Arguments for the method
> * @param {Object} context - Context for the method
> * @returns {any} - Result of the method invocation

> * Returns a module property by key.
> * @param {string} key - Property key
> * @returns {any} - Property value or undefined

> * Sets a module property by key.
> * @param {string} key - Property key
> * @param {any} value - Property value

> * Returns information about the module.
> * @returns {Object} - Module information


---
## 📄 File: `./core\runtime\SessionController.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module SessionController
> * @description This module manages user sessions, including login, logout, and scenario activation.
> * It handles user authentication, session state, and interaction with the audit and tunnel services.

> * Starts the session scenario.

> * Logs out the user and clears the session.

> * Activates a session scenario.
> * @param {string} name - Scenario name.
> * @param {object} inputData - Input data for the scenario.
> * @throws {Error} If the scenario is not available.

> * Summarizes the audit logs.

> * Returns the audit logs.


---
## 📄 File: `./core\runtime\UIDSLRuntime.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module UIDSLRuntime
> * @description Runtime for evaluating and processing UI DSL.

> * Evaluates a condition.
> * @param {string} expr - Expression to evaluate.
> * @returns {boolean} - Result of the evaluation.
> * @description Evaluates the condition based on the intent.

> * Returns the visible panels.
> * @returns {Array} - List of visible panels.


---
## 📄 File: `./core\scheduler\IntentScheduler.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module IntentScheduler
> * @description This class schedules and manages user intents with support for secure execution and fallback mechanisms.
> * @requires SecureIntentWrapper - Wrapper for secure intent execution.

> * @constructor
> * @param {number} maxConcurrent - Maximum number of concurrent intents.

> * Schedules an intent.
> * @param {Object} intent - Intent to schedule.
> * @param {Function} callback - Callback function to process the result.

> * Cancels a scheduled intent.
> * @param {string} id - ID of the intent to cancel.

> * Runs the intent with an optional fallback intent.
> * @param {Object} intent - Intent to execute.
> * @param {Object} fallback - Optional fallback intent.

> * Starts the scheduler.

> * Activates the next intent.
> * @private


---
## 📄 File: `./core\security\SecurityToken.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module SecurityToken
> * @description This module provides functionality for managing security tokens, including validation, permissions, and auditing.

> * Creates a new security token.
> * @param {string} tokenString - JWT token as a string.

> * Gets permissions based on role.
> * @param {string} role - User role.
> * @returns {Array} - List of permissions for the role.

> * Creates an audit entry for token activity.
> * @param {string} action - Action to log.
> * @param {string} status - Status of the log entry.
> * @param {Object} extra - Additional information for the log entry.
> * @returns {Object} - Created audit log entry.

> * Checks if the token is expired.
> * @returns {boolean} - True if the token is expired.

> * Checks if the token has permission for a specific action.
> * @param {string} action - Action to check.
> * @returns {boolean} - True if the token has permission.

> * Checks if the token is valid.
> * @returns {boolean} - True if the token is valid.

> * Checks if the token has admin role.
> * @returns {boolean} - True if the token has admin role.

> * Checks if the token has user role.
> * @returns {boolean} - True if the token has user role.

> * Checks if the token has guest role.
> * @returns {boolean} - True if the token has guest role.

> * Returns a structured description of the JWT token.
> * @returns {Object|null} - Decoded payload or null if an error occurred.

> * Verifies the signature of the JWT token.
> * @param {string} secret - Secret key for signature verification.
> * @returns {boolean} - True if the signature is valid.

> * Returns a structured description of the JWT token.
> * @returns {Object|null} - Decoded payload or null if an error occurred.

> * Returns a string representation of the token.
> * @returns {string} - String representation of the token.

> * Returns a JSON representation of the token.
> * @returns {Object} - JSON representation of the token.

> * Returns the remaining lifetime of the token.
> * @param {string} unit - Unit for output (ms, s, m, human).
> * @returns {number|string} - Remaining lifetime in the requested unit.

> * Returns a structured object with information about the token.
> * @returns {Object} - Object with information about the token.


---
## 📄 File: `./core\security\SecurityTokenLayer.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module SecurityTokenLayer
> * @description This module provides functions for working with JWT tokens.

> * Signs a JWT token.
> * @param {Object} payload - Payload for the token.
> * @returns {string} - Signed JWT token.

> * Verifies the validity of a JWT token.
> * @param {string} token - JWT token as a string.
> * @returns {Object|null} - Decoded payload or null if an error occurred.


---
## 📄 File: `./core\security\SystemSecurityManager.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module SystemSecurityManager
> * @description This module manages user security levels.

> * Raises the security level of a user.
> * @param {string} userId - User ID.
> * @param {string} reason - Reason for raising the level.
> * @returns {Object} - Information about the raised level.

> * Returns the current security level of a user.
> * @param {string} userId - User ID.
> * @returns {number} - Current security level.


---
## 📄 File: `./core\security\TokenLifecycleManager.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module TokenLifecycleManager
> * @description This module manages the lifecycle of tokens, including expiration and revocation.

> * Checks if a token is expiring soon.
> * @param {Object} token - Token object.
> * @param {number} thresholdMinutes - Threshold value in minutes.
> * @returns {boolean} - True if the token is expiring soon, otherwise false.

> * Revokes a token.
> * @param {string} tokenId - Token ID.
> * @param {string} userId - User ID.
> * @param {string} reason - Reason for revocation.
> * @returns {boolean} - True if the token was successfully revoked, otherwise false.

> * Checks if a token is revoked.
> * @param {string} tokenId - Token ID.
> * @returns {boolean} - True if the token is revoked, otherwise false.

> * Returns a list of revoked tokens.
> * @returns {Array} - List of revoked tokens.

> * Saves the token blacklist.

> * Loads the token blacklist.


---
## 📄 File: `./core\security\TrustSupervisor.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module TrustSupervisor
> * @description This module supervises user trust levels and detects anomalies.

> * @constructor

> * Observes user intent.
> * @param {Object} param - Monitoring parameters.
> * @param {Object} param.token - User token.
> * @param {string} param.intent - User intent.
> * @param {boolean} param.approved - Approved or denied.

> * Returns the trust level for a user.
> * @param {string} userId - User ID.
> * @returns {number|null} - User trust or null.

> * Returns a description of a user.
> * @param {string} userId - User ID.
> * @returns {Object|null} - User description or null.

> * Returns the monitoring history.
> * @returns {Array} - Monitoring history.


---
## 📄 File: `./core\security\TrustVisualizer.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module TrustVisualizer
> * @description This module visualizes user trust levels.

> * @constructor
> * @param {TrustSupervisor} trustSupervisor - Instance of TrustSupervisor.

> * Returns the trust evolution for a user.
> * @param {string} userId - User ID.
> * @returns {Array} - Trust evolution.

> * Draws an ASCII trust chart for a user.
> * @param {string} userId - User ID.
> * @returns {string} - ASCII trust chart.

> * Summarizes user information.
> * @param {string} userId - User ID.
> * @returns {Object} - User information summary.


---
## 📄 File: `./core\security\analysis\TrustAnomalyDetector.js`


### 📝 Documentation Blocks:
> * Detect trust anomalies in the history.
> * @param {Array} history - Trust history.
> * @param {number} thresholdDrop - Threshold for trust drop.
> * @param {number} thresholdJump - Threshold for trust jump.
> * @returns {Array} - List of detected anomalies.


---
## 📄 File: `./core\security\history\SecurityTokenHistory.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module SecurityTokenHistory
> * @description This module manages the history of security tokens.

> * Records a snapshot of the token into history.
> * @param {Object} token - The token to record.
> * @param {string} [source="system"] - Source of the record.
> * @returns {Object} - Recorded snapshot.

> * Gets the token history for a specific user.
> * @param {string} userId - User ID.
> * @returns {Array} - List of history records for the user.

> * Gets all token snapshots.
> * @returns {Array} - List of all snapshots.

> * Saves the token history to a file.

> * Loads the token history from a file.


---
## 📄 File: `./core\services\AuditService.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module AuditService
> * @description This module handles auditing of user actions.

> * @constructor

> * Logs an audit entry.
> * @param {Object} entry - Audit entry.

> * Generates a unique trace ID for an audit entry.
> * @param {Object} entry - Audit entry.
> * @returns {string} - Generated trace ID.

> * Retrieves the audit history.
> * @param {Object} filter - Filter criteria.
> * @returns {Array} - Filtered audit history.

> * Summarizes audit entries.
> * @returns {Object} - Summary of audit entries.

> * Clears the audit history.


---
## 📄 File: `./core\services\JWTSignatureAudit.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module JWTSignatureAudit
> * @description This module handles auditing of JWT signature attempts.

> * Records a JWT signature attempt.
> * @param {Object} attempt - The signature attempt details.
> * @returns {Object} - The recorded signature attempt.

> * Retrieves all JWT signature attempts.
> * @returns {Array} - List of all signature attempts.

> * Exports all JWT signature attempts to a JSON file.
> * @param {string} filename - The name of the file to export to.


---
## 📄 File: `./core\services\PersistentAuditService.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module PersistentAuditService
> * @description This module handles the persistent storage of audit logs.

> * Logs an audit entry.
> * @param {Object} entry - The audit entry to log.
> * @returns {Object} - The logged audit entry.

> * Retrieves all audit entries.
> * @returns {Array} - List of all audit entries.

> * Filters audit entries by user ID.
> * @param {string} userId - The user ID to filter by.
> * @returns {Array} - List of audit entries for the specified user.

> * Filters audit entries by type.
> * @param {string} type - The type to filter by.
> * @returns {Array} - List of audit entries for the specified type.

> * Exports the audit log to a file.
> * @param {string} filename - The name of the file to export to.

> * Generates a unique trace ID.
> * @returns {string} - The generated trace ID.

> * Loads the audit log from disk.

> * Saves the audit log to disk.


---
## 📄 File: `./core\services\SignatureAnomalyDetector.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module SignatureAnomalyDetector
> * @description This module detects anomalies in user authentication attempts.

> * Detects anomalies in user authentication attempts.
> * @param {Array} attempts - The list of authentication attempts.
> * @param {number} threshold - The threshold for invalid attempts.
> * @returns {Array} - List of tokens with invalid attempts above the threshold.


---
## 📄 File: `./core\services\TunnelService.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module TunnelService
> * @description This module handles communication between different parts of the application.

> * Creates an instance of TunnelService.

> * Listens for messages on a specific channel.
> * @param {string} channel - The channel to listen on.
> * @param {function} handler - The function to call when a message is received.

> * Sends a message on a specific channel.
> * @param {string} channel - The channel to send the message on.
> * @param {any} payload - The message payload.

> * Broadcasts a message to all channels.
> * @param {any} payload - The message payload.

> * Closes a specific channel.
> * @param {string} channel - The channel to close.


---
## 📄 File: `./core\shadow\ShadowEvaluatorHelper.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module ShadowEvaluatorHelper
> * @description This module provides helper functions for evaluating shadow interactions.

> * Processes the mirror evaluation result.
> * @param {Object} mirrorResult - The result of the mirror evaluation.
> * @param {Object} ghostToken - The ghost token associated with the user.
> * @param {Array} shadowHistory - The history of shadow interactions.
> * @returns {Object} - The processing result.


---
## 📄 File: `./core\shadow\ShadowEvaluatorMirror.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module ShadowEvaluatorMirror
> * @description This module handles mirroring of shadow evaluations.

> * Creates a shadow mirror for evaluating intents.
> * @param {Function} evaluatorDescribeFn - The function to describe the evaluator.
> * @returns {Object} - The shadow mirror object.


---
## 📄 File: `./core\shadow\shadowReactor.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module ShadowReactor
> * @description This module handles the shadow reaction evaluation.

> * Evaluates the shadow response based on the tunnel frame and orchestrator.
> * @param {Object} tunnelFrame - The tunnel frame containing shadow context.
> * @param {Object} orchestrator - The orchestrator instance.
> * @returns {Object} - The evaluation result.


---
## 📄 File: `./core\shadow\shadowSimulator.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module ShadowSimulator
> * @description This module handles the simulation of shadow interactions.

> * Computes the trust score for a ghost token.
> * @param {Object} token - The ghost token.
> * @returns {number} - The computed trust score.

> * Predicts the intent based on the user's interaction history.
> * @param {Array} history - The user's interaction history.
> * @returns {string} - The predicted intent.

> * Estimates the divergence between predicted and actual intents.
> * @param {string} predicted - The predicted intent.
> * @param {string} actual - The actual intent.
> * @returns {string} - The divergence level.

> * Simulates the shadow synchronization process for a ghost token.
> * @param {Object} ghostToken - The ghost token to simulate.
> * @returns {Object} - The simulated tunnel frame.


---
## 📄 File: `./core\token\Token.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module Token
> * @description This module handles the creation and management of tokens.

> * Creates an instance of the Token class.
> * @param {Object} config - The configuration object for the token.

> * Checks if the token is valid.
> * @returns {boolean} - True if the token is valid, false otherwise.

> * Elevates the role of the token.
> * @param {string} newRole - The new role to assign to the token.

> * Decreases the trust score of the token.
> * @param {number} value - The amount to decrease the trust score by.

> * Activates audit mode for the token.

> * Gets the fingerprint of the token.
> * @returns {string} - The token fingerprint.

> * Gets the information about the token.
> * @returns {Object} - The token information.


---
## 📄 File: `./modules\AccessControlledModule.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module AccessControlledModule
> * @description This module handles access control for various methods.

> * Creates an instance of the AccessControlledModule class.
> * @param {string} name - The name of the module.

> * Registers a new method in the module.
> * @param {string} name - The name of the method.
> * @param {Function} handler - The function to handle the method calls.
> * @param {Array<string>} permissions - The permissions required to call the method.

> * Calls a registered method in the module.
> * @param {string} methodName - The name of the method to call.
> * @param {Object} token - The token object representing the user.
> * @param {Object} payload - The payload to pass to the method.
> * @returns {any} - The result of the method call.

> * Describes the module and its methods.
> * @returns {Object} - The module description.


---
## 📄 File: `./modules\ModuleRegistry.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module ModuleRegistry
> * @description This module handles the registration and management of other modules.

> * @param {Object} context – context for the module registry. Example: { userId, sectorId, ... }

> * Registers a module instance.
> * @param {string} name
> * @param {AccessControlledModule} moduleInstance

> * Registers a module from the given handler map
> * @param {string} name
> * @param {Object<string,Function>} handlers – map method → function
> * @param {Object<string,string[]>} permissions – map method → required permissions

> * Calls a method on the module. Key in the form of "ModuleName.methodName"
> * @param {string} key      – e.g. "DataSync.activateSync"
> * @param {SecurityToken} token
> * @param {Object} payload

> * @returns {string[]} list of registered modules


---
## 📄 File: `./modules\auth\AuthCenter.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module AuthCenter
> * @description This module handles authentication and authorization processes.


---
## 📄 File: `./scenarios\AdaptiveScenarioRouter.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module AdaptiveScenarioRouter
> * @description This module handles routing of adaptive scenarios based on user trust and security level.

> * Routes the scenario based on user trust and security level.
> * @param {Object} token - The user token.
> * @param {Object} variants - The scenario variants.
> * @returns {Promise<string>} The result of the routed scenario.


---
## 📄 File: `./scenarios\ScenarioSafetyWrapper.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module ScenarioSafetyWrapper
> * @description This module handles auditing of scenario execution attempts.

> * Wraps a scenario function with safety checks.
> * @param {Function} scenarioFn - The scenario function to wrap.
> * @param {Object} token - The user token.
> * @param {Object} options - Additional options for wrapping.
> * @returns {Object} The result of the wrapped scenario.


---
## 📄 File: `./scenarios\ScenarioSandboxRedirector.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module ScenarioSandboxRedirector
> * @description This module handles redirecting blocked scenarios to a sandbox environment.

> * Redirects a blocked scenario to a sandbox environment.
> * @param {Object} info - Information about the blocked scenario.
> * @param {Object} token - The user token.
> * @param {Function} sandboxFn - The sandbox function to execute.
> * @returns {Object} The result of the sandbox execution.


---
## 📄 File: `./scenarios\base\BaseScenario.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module BaseScenario
> * @description This module handles the base scenario for JWT signature auditing.

> * Creates an instance of the BaseScenario class.
> * @param {Object} context - The context for the scenario.

> * Gets the intent of the scenario.
> * @returns {string} - The intent of the scenario.

> * Gets the entry point of the scenario.
> * @returns {string} - The entry point of the scenario.

> * Mutates the scenario state based on the token context.
> * @param {Object} tokenContext - The context of the token.

> * Reflects the current state of the scenario.
> * @returns {Object} - The reflected state of the scenario.

> * Gets the audit trace for a specific command.
> * @param {string} command - The command to audit.
> * @returns {Object} - The audit trace for the command.


---
## 📄 File: `./scenarios\login\LoginScenario.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module LoginScenario
> * @description This module handles the login scenario for JWT signature auditing.

> * Creates an instance of the LoginScenario class.
> * @param {Object} context - The context for the scenario.

> * Runs the login scenario.
> * @param {Object} userData - The user data for the login attempt.

> * Renders the current state of the login scenario.


---
## 📄 File: `./scenarios\recovery\RecoveryScenario.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module RecoveryScenario
> * @description This module handles the recovery scenario for JWT signature auditing.

> * Gets the intent of the scenario.
> * @returns {string} The intent of the scenario.

> * Mutates the scenario state based on the recovery attempt.
> * @param {Object} params - The parameters for the mutation.
> * @param {boolean} params.tokenValid - Whether the token is valid.
> * @param {boolean} params.userKnown - Whether the user is known.

> * Reflects the current state of the scenario.
> * @returns {Object} The current state of the scenario.


---
## 📄 File: `./scenarios\registry\ScenarioRegistry.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module ScenarioRegistry
> * @description This module handles the registration and activation of scenarios.

> * Creates an instance of the ScenarioRegistry class.
> * @param {Object} controllerContext - The context for the controller.

> * Registers a new scenario.
> * @param {string} intent - The intent of the scenario.
> * @param {Function} ScenarioClass - The scenario class to register.

> * Activates a registered scenario.
> * @param {string} name - The name of the scenario to activate.
> * @param {Object} payload - The payload for the scenario.
> * @returns {Promise<Object>} The result of the scenario activation.

> * Gets a registered scenario instance.
> * @param {string} name - The name of the scenario to get.
> * @returns {Object|null} The scenario instance or null if not found.

> * Lists all registered scenario names.
> * @returns {Array<string>} The list of registered scenario names.


---
## 📄 File: `./sectors\AlertScenario.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module AlertScenario
> * @description This module handles alert scenarios for the system.

> * Creates an instance of the AlertScenario.
> * @param {object} context - The context for the alert scenario.

> * Runs the alert scenario.
> * @param {object} payload - The payload for the alert scenario.
> * @returns {object} The result of the alert scenario.


---
## 📄 File: `./sectors\SectorNode.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module SectorNode
> * @description This module handles the creation and management of sector nodes.

> * Creates an instance of the SectorNode.
> * @param {object} params - The parameters for the sector node.
> * @param {string} params.id - The ID of the sector.
> * @param {object} params.token - The token for the sector.
> * @param {object} [params.context={}] - The context for the sector.

> * Registers a scenario for the sector.
> * @param {string} intent - The intent of the scenario.
> * @param {class} ScenarioClass - The scenario class to register.

> * Activates a scenario in this sector.
> * @param {string} name - The name of the scenario to activate.
> * @param {object} [payload={}] - The payload to pass to the scenario.
> * @returns {object} The summary of the activated scenario.

> * Calls a method on a module in this sector.
> * @param {string} moduleName - The name of the module.
> * @param {string} methodName - The name of the method to call.
> * @param {object} [payload={}] - The payload to pass to the method.
> * @returns {object} The result of the module method call.

> * Broadcasts a message to the tunnel.
> * @param {object} message - The message to broadcast.

> * Describes the sector node.
> * @returns {object} The description of the sector node.


---
## 📄 File: `./sectors\audit\AuditSector.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module AuditSector
> * @description This module handles auditing of scenario execution attempts.

> * @constructor
> * @param {Object} context - The context of the audit.
> * @param {Object} token - The user token.
> * @param {Array} scenarioLog - The log of scenario executions.

> * Resolves the audit actions based on the context and log.
> * @returns {Array} The list of actions to take.


---
## 📄 File: `./sectors\groups\SecurityGroup.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module SecurityGroup
> * @description This module handles auditing of scenario execution attempts.

> * @constructor
> * @param {Object} context - The context of the security group.
> * @param {Object} token - The user token.
> * @param {Object} serverReply - The server reply object.

> * Resolves all security actions.
> * @returns {Array} The list of all actions to take.

> * Gets the list of all actions to take.
> * @returns {Array} The list of all actions to take.

> * Reports the security group status.
> * @returns {Object} The report object.


---
## 📄 File: `./sectors\login\LoginSector.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module LoginSector
> * @description This module handles auditing of login attempts.

> * @constructor
> * @param {Object} context - The context of the login attempt.
> * @param {Object} token - The user token.

> * Resolves the login actions based on the server reply.
> * @param {Object} serverReply - The server reply object.
> * @returns {Array} The list of actions to take.


---
## 📄 File: `./sectors\orchestration\FallbackIntentHandler.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module FallbackIntentHandler
> * @description This module handles the fallback intent logic.

> * @constructor
> * @param {Object} primary - The primary intent.
> * @param {Object} fallback - The fallback intent.

> * Runs the fallback intent handler.
> * @returns {Object} The result of the intent execution.


---
## 📄 File: `./sectors\orchestration\ghostScenarioQueue.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module GhostScenarioQueue
> * @description This module handles the ghost scenario queue for JWT signature attempts.

> * Enqueues a new ghost scenario.
> * @param {Object} params - The parameters for the ghost scenario.
> * @param {string} params.clientId - The client ID.
> * @param {string} params.intent - The intent.
> * @param {string} params.sectorId - The sector ID.
> * @param {number} params.trustLevel - The trust level.
> * @returns {Object} The enqueued ghost scenario.

> * Lists all ghost scenarios.
> * @param {Function} filterFn - Optional filter function.
> * @returns {Array} The list of ghost scenarios.

> * Expires a ghost scenario.
> * @param {string} id - The ID of the ghost scenario.

> * Activates a ghost scenario.
> * @param {string} id - The ID of the ghost scenario.


---
## 📄 File: `./sectors\orchestration\IntentEvaluator.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module IntentEvaluator
> * @description This module handles the evaluation of intents based on user roles and trust levels.

> * @constructor
> * @param {Object} rules - The initial rules for intent evaluation.

> * Registers a new rule for intent evaluation.
> * @param {string} intent - The intent to register the rule for.
> * @param {Array} conditions - The conditions for the rule.

> * Evaluates an intent against the provided token and context.
> * @param {string} intent - The intent to evaluate.
> * @param {Object} token - The token representing the user's context.
> * @param {Object} context - Additional context for the evaluation.
> * @returns {Object} The result of the evaluation.

> * Describes the current rules.
> * @returns {Object} The current rules.


---
## 📄 File: `./sectors\orchestration\IntentFlowTracer.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module IntentFlowTracer
> * @description This module handles tracing of intent flows.

> * @constructor

> * Traces the intent flow.
> * @param {Object} params - The parameters for tracing the intent.
> * @param {string} params.intent - The intent being traced.
> * @param {Object} params.token - The token representing the user's context.
> * @param {Object} params.evaluatorResult - The result of the intent evaluation.
> * @param {Object} params.sectorResponse - The response from the target sector.

> * Describes the flow at a specific index.
> * @param {number} index - The index of the flow to describe.
> * @returns {Object|null} The flow description or null if not found.

> * Exports the flow log as a JSON string.
> * @returns {string} The JSON representation of the flow log.


---
## 📄 File: `./sectors\orchestration\IntentSandboxRunner.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module IntentSandboxRunner
> * @description This module handles the sandboxing and simulation of intent execution.

> * @constructor
> * @param {Array} intents - The list of intents to simulate.
> * @param {Object} options - Options for the sandbox runner.

> * Runs the sandbox simulation.
> * @returns {Promise<void>}

> * Mocks the execution of an intent.
> * @param {Object} intent - The intent to simulate.
> * @returns {Promise<Object>} The simulated result.

> * Simulates a delay.
> * @param {number} ms - The delay duration in milliseconds.
> * @returns {Promise<void>}


---
## 📄 File: `./sectors\orchestration\InterSectorProtocol.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module InterSectorProtocol
> * @description This module handles the communication and reaction protocols between sectors.

> * Registers a reaction to an intent.
> * @param {string} sourceIntent - The original intent (e.g. 'recovery').
> * @param {object} config - The reaction configuration.

> * Handles the output from a sector and decides whether to activate further reactions.
> * @param {object} output - The sector output (e.g. { intent, status, actor, ... })
> * @param {SectorOrchestrator} orchestrator
> * @returns {object[]} The results of the reactions

> * Describes the current state of the protocol.
> * @returns {object} The description of the protocol state.


---
## 📄 File: `./sectors\orchestration\SectorOrchestrator.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module SectorOrchestrator
> * @description This module handles the orchestration of sector interactions and intent management.

> * Creates an instance of the SectorOrchestrator.

> * Registers a sector node.
> * @param {string} id - The sector ID.
> * @param {SectorNode} sectorNode - The sector node instance.

> * Maps an intent to a sector ID.
> * @param {string} intent - The intent name.
> * @param {string} sectorId - The sector ID.

> * Sends a message to a target sector.
> * @param {string} targetSectorId - The target sector ID.
> * @param {object} message - The message object.

> * Activates an intent for a specific sector.
> * @param {string} intent - The intent to activate.
> * @param {object} token - The user token.
> * @param {object} payload - Additional payload data.

> * Describes the current state of the orchestrator.
> * @returns {object} The description of the orchestrator state.


---
## 📄 File: `./sectors\orchestration\SecureIntentWrapper.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module SecureIntentWrapper
> * @description This module handles the secure execution of intents with fallback options.

> * Securely executes an intent with a fallback option.
> * @param {object} params - The parameters for the wrapper.
> * @param {object} params.intent - The main intent to execute.
> * @param {object} params.fallback - The fallback intent to execute on failure.
> * @param {object} params.token - The user token for authorization.
> * @param {object} params.logger - The logger instance.
> * @returns {object} The result of the intent execution.


---
## 📄 File: `./sectors\orchestration\shadowBridge.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module ShadowBridge
> * @description This module handles the bridging of shadow client predictions.

> * Forwards a shadow prediction from a client to the orchestrator.
> * @param {object} tunnelFrame - The tunnel frame containing client information.
> * @param {object} reactionResult - The result of the shadow client's prediction.
> * @param {object} orchestrator - The orchestrator instance.


---
## 📄 File: `./services\executor\ActionExecutor.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module ActionExecutor
> * @description This module handles the execution of actions within a sector.

> * Creates an instance of the ActionExecutor.
> * @param {object} context - The context for the action executor.
> * @param {object} token - The token for the action executor.

> * Runs a series of actions.
> * @param {Array<string>} actions - The list of actions to run.
> * @returns {Array<string>} The output messages from the actions.

> * Gets the current state of the action executor.
> * @returns {object} The current state of the action executor.


---
## 📄 File: `./services\logger\AuditLogger.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module AuditLogger
> * @description This module handles logging of audit events within the system.
> * It records events with timestamps, user fingerprints, and scenario states.

> * Creates an instance of the AuditLogger.

> * Logs an audit event.
> * @param {object} params - The parameters for the log entry.
> * @param {string} params.message - The log message.
> * @param {object} params.token - The user token.
> * @param {object} params.scenario - The scenario object.
> * @param {number} [params.timestamp=Date.now()] - The timestamp for the log entry.

> * Gets the complete audit log history.
> * @returns {Array<object>} The audit log entries.

> * Filters the audit log entries by user ID.
> * @param {string} userId - The user ID to filter by.
> * @returns {Array<object>} The filtered audit log entries.

> * Clears the audit log entries.

> * Exports the audit log entries as a JSON string.
> * @returns {string} The JSON string representation of the audit log entries.


---
## 📄 File: `./services\logger\CommandLogger.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module CommandLogger
> * @description This module handles auditing of command executions.

> * Creates an instance of the CommandLogger.

> * Logs a command execution entry.
> * @param {object} params - The parameters for the log entry.
> * @param {string} params.command - The command that was executed.
> * @param {any} params.result - The result of the command execution.
> * @param {number} [params.timestamp=Date.now()] - The timestamp for the log entry.

> * Gets the complete command log history.
> * @returns {Array<object>} The command log entries.

> * Filters the command log entries by command name.
> * @param {string} cmd - The command name to filter by.
> * @returns {Array<object>} The filtered command log entries.

> * Clears the command log entries.

> * Exports the command log entries as a JSON string.
> * @returns {string} The JSON string representation of the command log entries.


---
## 📄 File: `./services\logger\MirrorVsActivationComparator.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module MirrorVsActivationComparator
> * @description This module handles the comparison of mirror and activation traces.

> * Compares mirror traces with activation logs.
> * @param {Array<object>} mirrorTrace - The mirror trace data.
> * @param {Array<object>} activationLog - The activation log data.
> * @returns {Array<object>} The comparison results.


---
## 📄 File: `./src\context\RulesContext.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module RulesContext
> * @description This module provides a context for managing dynamic rules.


---
## 📄 File: `./src\rules\RuleHotReloadService.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module RuleHotReloadService
> * @description This module provides hot-reloading capabilities for rule configurations.

> * Load rules from a JSON file.
> * @param {string} configPath - The path to the config file.
> * @returns {Promise<Object>} - A promise that resolves to the loaded rules.

> * Get a rule by its key.
> * @param {string} key - The key of the rule.
> * @returns {Object|null} - The rule object or null if not found.

> * Reload the rules from the config file.
> * @param {string} configPath - The path to the config file.
> * @returns {Promise<Object>} - A promise that resolves to the reloaded rules.


---
## 📄 File: `./tools\JWTVerificationStats.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module JWTVerificationStats
> * @description This module handles auditing of JWT verification attempts.

> * Extracts statistics from JWT verification attempts.
> * @param {Array<Object>} attempts - The JWT verification attempts.
> * @returns {Object} - The extracted statistics.


---
## 📄 File: `./tools\cli\SecurityTokenInspector.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module SecurityTokenInspector
> * @description This module provides utilities for inspecting security tokens.

> * Inspect a security token and return its details.
> * @param {Object} token - The security token to inspect.
> * @returns {Array<string>} - An array of strings representing the token details.


---
## 📄 File: `./tools\cli\TokenInspektorDashboard.js`


### 📝 Documentation Blocks:
> * @author Starass
> * @module TokenInspectorDashboard
> * @description This module provides a dashboard for inspecting security tokens.

> * Create a demo security token for testing purposes.
> * @returns {string} - The signed JWT token.

> * Run the Token Inspector Dashboard.


---
