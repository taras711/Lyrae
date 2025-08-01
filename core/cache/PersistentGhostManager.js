/**
 * @author Starass
 * This module manages and manipulates a queue of ghosts,
 * which stores user intents for later processing.
 * @module PersistentGhostManager
 * @description This module manages and manipulates a queue of ghosts,
 * which stores user intents for later processing.
 */

const PersistentGhostQueue = require('./PersistentGhostQueue');

let ghostQueue = PersistentGhostQueue.load();

// Add a new intent to the queue
function addIntent(intent) {
  ghostQueue.push(intent);
  PersistentGhostQueue.save(ghostQueue);
}

/**
 *  Reset the intent queue
 *  This function clears all intents in the queue and resets it to empty.
 *  It is used, for example, when restarting the application or when clearing the queue.
 *  @returns {void}
 */
function resetQueue() {
  ghostQueue = [];
  PersistentGhostQueue.clear();
}

/**
 * Load the intent queue
 * @returns {Array} - Array of intents
 */
function getQueue() {
  return PersistentGhostQueue.load();
}

/**
 * Load an intent by ID
 * @param {*} id - ID of the intent
 * @returns {Object|null} - Found intent or null
 */
function getIntentById(id) {
  const queue = PersistentGhostQueue.load();
  return queue.find(intent => intent.id === id);
}

/**
 * Remove an intent by ID
 * @param {*} id - ID of the intent
 */
function removeIntentById(id) {
  ghostQueue = ghostQueue.filter(intent => intent.id !== id);
  PersistentGhostQueue.save(ghostQueue);
}

/**
 * Get the count of intents
 * @returns {number} - Number of intents in the queue
 */
function getQueueCount() {
  return ghostQueue.length;
}

/**
 * Get intents by type
 * @param {*} type - Type of the intent
 * @returns {Array} - Array of intents
 */
function getIntentsByType(type) {
  return ghostQueue.filter(intent => intent.type === type);
}

/**
 * Get intents by priority
 * @param {*} priority - Priority of the intent
 * @returns {Array} - Array of intents
 */
function getIntentsByPriority(priority) {
  return ghostQueue.filter(intent => intent.priority === priority);
}

/**
 * Get intents by retry status
 * @param {*} retries - Retry status of the intent
 * @returns {Array} - Array of intents
 */
function getIntentsByRetries(retries) {
  return ghostQueue.filter(intent => intent.retries === retries);
}

/**
 * Get intents by action
 * @param {*} action - Action of the intent
 * @returns {Array} - Array of intents
 */
function getIntentsByAction(action) {
  return ghostQueue.filter(intent => intent.payload.action === action);
}

/**
 * Get intents by target
 * @param {*} target - Target of the intent
 * @returns {Array} - Array of intents
 */
function getIntentsByTarget(target) {
  return ghostQueue.filter(intent => intent.payload.target === target);
}

/**
 * Get intents by user ID
 * @param {*} userId - User ID
 * @returns {Array} - Array of intents
 */
function getIntentsByUserId(userId) {
  return ghostQueue.filter(intent => intent.payload.userId === userId);
}

/**
 * Get intents by timestamp
 * @param {*} timestamp - Timestamp of the intent
 * @returns {Array} - Array of intents
 */
function getIntentsByTimestamp(timestamp) {
  return ghostQueue.filter(intent => intent.payload.timestamp === timestamp);
}

/**
 * Get intents by user ID pattern
 * @param {*} userId - User ID
 * @returns {Array} - Array of intents
 */
function getIntentsByUserIdPattern(pattern) {
  const regex = new RegExp(pattern);
  return ghostQueue.filter(intent => regex.test(intent.payload.userId));
}

/**
 * Get intents by action ID
 * @param {*} actionId - Action ID
 * @returns {Array} - Array of intents
 */
function getIntentsByActionId(actionId) {
   const queue = PersistentGhostQueue.load();
   return queue.filter(intent => intent.payload && intent.payload.actionId === actionId);
}

/**
 * Get intents by target ID
 * @param {*} targetId - Target ID
 * @returns {Array} - Array of intents
 */
function getIntentsByTargetId(targetId) {
   const queue = PersistentGhostQueue.load();
   return queue.filter(intent => intent.payload && intent.payload.targetId === targetId);
}

/**
 * Get intents by priority ID
 * @param {*} priorityId - Priority ID
 * @returns {Array} - Array of intents
 */
function getIntentsByPriorityId(priorityId) {
   const queue = PersistentGhostQueue.load();
   return queue.filter(intent => intent.payload && intent.payload.priorityId === priorityId);
}

/**
 * Get intents by retries ID
 * @param {*} retriesId - Retries ID
 * @returns {Array} - Array of intents
 */
function getIntentsByRetriesId(retriesId) {
   const queue = PersistentGhostQueue.load();
   return queue.filter(intent => intent.payload && intent.payload.retriesId === retriesId);
}

/**
 * Get intents by timestamp ID
 * @param {*} timestampId - Timestamp ID
 * @returns {Array} - Array of intents
 */
function getIntentsByTimestampId(timestampId) {
   const queue = PersistentGhostQueue.load();
   return queue.filter(intent => intent.payload && intent.payload.timestampId === timestampId);
}

/**
 * Get intents by type ID
 * @param {*} typeId - Type ID
 * @returns {Array} - Array of intents
 */
function getIntentsByTypeId(typeId) {
   const queue = PersistentGhostQueue.load();
   return queue.filter(intent => intent.payload && intent.payload.typeId === typeId);
}

module.exports = {
    addIntent,
    resetQueue,
    getQueue,
    getIntentById,
    removeIntentById,
    getQueueCount,
    getIntentsByType,
    getIntentsByPriority,
    getIntentsByRetries,
    getIntentsByTimestamp,
    getIntentsByTypeId,
    getIntentsByAction,
    getIntentsByTarget,
    getIntentsByUserId,
    getIntentsByUserIdPattern,
    getIntentsByActionId,
    getIntentsByTargetId,
    getIntentsByPriorityId,
    getIntentsByRetriesId,
    getIntentsByTimestampId
};