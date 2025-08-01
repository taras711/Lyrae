/*

 * Mocking localStorage for testing purposes

 */

// Mocking localStorage for Node.js environment
// This is necessary because localStorage is not available in Node.js by default
global.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, value) { this.store[key] = value; },
  removeItem(key) { delete this.store[key]; },
  clear() { this.store = {}; }
};


const feedGhostQueue = require('../../core/devtools/GhostIntentFeeder');
const PersistentGhostQueue = require('../../core/cache/PersistentGhostQueue');
const {addIntent, removeIntentById, getIntentById}  = require('../../core/cache/PersistentGhostManager');

beforeAll(() => {
  // Clear the localStorage before tests
  global.localStorage.clear();
});

describe('Ghost System', () => {
  beforeEach(() => {
    PersistentGhostQueue.clear();
  });

  // Test feeding ghost queue
  test('feedGhostQueue creates correct intents', () => {
    feedGhostQueue(5);
    const queue = PersistentGhostQueue.load();

    expect(queue.length).toBe(5);

    queue.forEach((intent, i) => {
      expect(intent.id).toBe(`ghost-${i}`);
      expect(intent.type).toBe('AUTO_TEST');
      expect(intent.retries).toBe(0);
      expect(typeof intent.priority).toBe('number');
      expect(intent.priority).toBeGreaterThanOrEqual(0);
      expect(intent.priority).toBeLessThanOrEqual(4);

      expect(intent.payload).toMatchObject({
        action: 'export',
        target: 'AuditCluster',
      });
      expect(intent.payload.userId).toMatch(/^USR-\d+$/);
      expect(intent.payload.timestamp).toBeGreaterThan(Date.now() - 10000);
    });
  });

  // Test getting intent by ID
  test('getIntentById finds correct intent', () => {
    feedGhostQueue(5);
    const intent = getIntentById('ghost-0');
    expect(intent).toBeDefined();
    expect(intent.id).toBe('ghost-0');
  });

  // Test removing intent by ID
  test('removeIntentById removes intent from queue', () => {
    removeIntentById('ghost-0');
    const intent = getIntentById('ghost-0');
    expect(intent).toBeUndefined();
  });

  // Test adding intent to persistent queue
  test('addIntent adds intent to persistent queue', () => {
    const newIntent = {
      id: 'ghost-custom',
      type: 'AUTO_TEST',
      payload: {
        userId: 'USR-9999',
        action: 'export',
        target: 'AuditCluster',
        timestamp: Date.now()
      },
      priority: 2,
      retries: 0
    };

    addIntent(newIntent);
    const queue = PersistentGhostQueue.load();
    expect(queue.find(i => i.id === 'ghost-custom')).toEqual(newIntent);
  });

  // Test feeding ghost queue with zero intents
  test('feedGhostQueue(0) leaves queue empty', () => {
    feedGhostQueue(0);
    const queue = PersistentGhostQueue.load();
    expect(queue).toEqual([]);
  });

  // Test multiple feeds accumulate intents
  test('multiple feeds accumulate intents', () => {
    feedGhostQueue(2);
    feedGhostQueue(3);
    const queue = PersistentGhostQueue.load();
    expect(queue.length).toBe(5);
  });
});
