/**
 * @author Starass

 * @module GhostIntentFeeder

 * @description This component is responsible for generating and feeding test intents into the ghost queue.

 */

const PersistentGhostQueue = require('../cache/PersistentGhostQueue');

/**
 * Generate a test intent
 * @param {number} i - Intent index
 * @returns {Object} - Created intent
 */
const generateIntent = (i) => ({
  id: `ghost-${i}`,
  type: 'AUTO_TEST',
  payload: {
    userId: `USR-${1000 + i}`,
    action: 'export',
    target: 'AuditCluster',
    timestamp: Date.now()
  },
  priority: Math.floor(Math.random() * 5), // 0–4
  retries: 0
});

/**
 * Main function for feeding the ghost queue
 * @param {number} count - Number of intents to generate
 */
module.exports = function feedGhostQueue(count = 10) {
  const ghostQueue = PersistentGhostQueue.load(); // Load existing queue

  for (let i = 0; i < count; i++) {
    const intent = generateIntent(i); // Create intent
    ghostQueue.push(intent); // Add intent to queue
  }

  PersistentGhostQueue.save(ghostQueue); // Save updated queue
  console.log(`👻 Loaded ${count} test intents into ghostQueue`);
}