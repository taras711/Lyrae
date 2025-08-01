/**
 * @author Starass

 * @module IntentScheduler

 * @description This class schedules and manages user intents with support for secure execution and fallback mechanisms.
 * @requires SecureIntentWrapper - Wrapper for secure intent execution.

 */

const secureIntentWrapper = require('../../sectors/orchestration/SecureIntentWrapper');

class IntentScheduler {

  /**
   * @constructor
   * @param {number} maxConcurrent - Maximum number of concurrent intents.
   */
  constructor(maxConcurrent = 3) {
    this.token = token; // Store token
    this.queue = new Map(); // Store queue
    this.pending = []; // Store pending intents
    this.completed = new Set(); // Store completed intents
    this.activeCount = 0; // Store active intents
    this.maxConcurrent = maxConcurrent; // Store maximum concurrent intents
  }

  /**
   * Schedules an intent.
   * @param {Object} intent - Intent to schedule.
   * @param {Function} callback - Callback function to process the result.
   */
  scheduleIntent(intent, callback) {
    const enrichedIntent = { ...intent, callback };

    if (intent.dependsOn && !intent.dependsOn.every(id => this.completed.has(id))) {
      this.pending.push(enrichedIntent);
      return;
    }

    this.pending.push(enrichedIntent);
    this.pending.sort((a, b) => b.priority - a.priority);
    this._activateNext();
  }

  /**
   * Cancels a scheduled intent.
   * @param {string} id - ID of the intent to cancel.
   */
  cancelScheduledIntent(id) {
    const timeout = this.queue.get(id);
    if (timeout) {
      clearTimeout(timeout);
      this.queue.delete(id);
    }

    this.pending = this.pending.filter(intent => intent.id !== id);
  }

  /**
   * Runs the intent with an optional fallback intent.
   * @param {Object} intent - Intent to execute.
   * @param {Object} fallback - Optional fallback intent.
   */
  async schedule(intent, fallback) {
    const wrapped = secureIntentWrapper({
      intent,
      fallback,
      token: this.token,
      logger: console,
    });

    return await wrapped.run();
  }
  
  /**
   * Starts the scheduler.
   */
  async run() {
    while (this.pending.length > 0) {
      const intent = this.pending.shift();
      const result = await this.schedule(intent, intent.fallback);
      intent.callback(result);
      this.completed.add(intent.id);
    }
  }

  /**
   * Activates the next intent.
   * @private
   */
  _activateNext() {
    while (this.activeCount < this.maxConcurrent && this.pending.length > 0) {
      const intent = this.pending.shift();
      const delay = Math.max(0, intent.timestamp - Date.now());

      const timeout = setTimeout(() => {
        intent.callback();
        this.completed.add(intent.id);
        this.queue.delete(intent.id);

        if (intent.repeatInterval) {
            const repeatTimeout = setTimeout(() => {
            this.scheduleIntent(intent, intent.callback);
            }, intent.repeatInterval);
            this.queue.set(`${intent.id}_repeat`, repeatTimeout);
        }

        this.activeCount--;
        this._activateNext(); // 🔁 moved after repeatTimeout
        }, delay);

      this.queue.set(intent.id, timeout);
      this.activeCount++;
    }
  }
}

module.exports = { IntentScheduler };