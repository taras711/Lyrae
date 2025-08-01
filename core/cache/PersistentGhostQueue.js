/**

 * @module PersistentGhostQueue

 * @description This component manages and manipulates a queue of ghosts,

 * which stores user intents for later processing.

 */

const STORAGE_KEY = 'ghostQueue'; // Key for storing the queue in localStorage

const PersistentGhostQueue = {

  /**
   * Save the queue to localStorage
   * @param {Array} queue - Array of intents
   */
  save(queue) {
    try {
      const serialized = JSON.stringify(queue);
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (e) {
      console.error('❌ GhostQueue save failed:', e);
    }
  },

  /**
   * Load the intent queue
   * @returns {Array} - Array of intents
   */
  load() {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      return serialized ? JSON.parse(serialized) : [];
    } catch (e) {
      console.error('❌ GhostQueue load failed:', e);
      return [];
    }
  },

  /**
   * Clear the intent queue
   * @returns {void}
   */
  clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('❌ GhostQueue clear failed:', e);
    }
  }
};

module.exports = PersistentGhostQueue;