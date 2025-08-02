/*

Mocking localStorage for testing purposes

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

const {
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
} = require('../../core/cache/PersistentGhostManager');

const PersistentGhostQueue = require('../../core/cache/PersistentGhostQueue');

describe('GhostIntentManager', () => {
  beforeEach(() => {
    resetQueue();
  });

  // Test adding intent to persistent queue
  test('addIntent saves intent correctly', () => {
    const intent = {
      id: 'ghost-001',
      type: 'TEST',
      payload: { userId: 'USR-001', timestamp: Date.now(), action: 'ping', target: 'X' },
      priority: 1,
      retries: 0
    };
    addIntent(intent);
    const queue = PersistentGhostQueue.load();
    expect(queue).toContainEqual(intent);
  });

  // Test getting intent by ID
  test('getIntentById returns correct intent', () => {
    const intent = {
      id: 'ghost-002',
      type: 'TEST',
      payload: { userId: 'USR-002', timestamp: Date.now(), action: 'pong', target: 'Y' },
      priority: 2,
      retries: 0
    };
    addIntent(intent);
    const found = getIntentById('ghost-002');
    expect(found).toBeDefined();
    expect(found.payload.action).toBe('pong');
  });

  // Test removing intent by ID
  test('removeIntentById deletes intent', () => {
    const intent = {
      id: 'ghost-003',
      type: 'REMOVE',
      payload: { userId: 'USR-003', timestamp: Date.now(), action: 'clear', target: 'Z' },
      priority: 0,
      retries: 0
    };
    addIntent(intent);
    removeIntentById('ghost-003');
    const removed = getIntentById('ghost-003');
    expect(removed).toBeUndefined();
  });

  // Test getting intents by type
  test('getIntentsByType filters correctly', () => {
    addIntent({ id: 'ghost-A', type: 'TYPE_A', payload: {}, priority: 1, retries: 0 });
    addIntent({ id: 'ghost-B', type: 'TYPE_B', payload: {}, priority: 1, retries: 0 });
    const filtered = getIntentsByType('TYPE_B');
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe('ghost-B');
  });

  // Test getting intents by priority
  test('getIntentsByPriority filters correctly', () => {
    addIntent({ id: 'ghost-X', type: 'P', payload: {}, priority: 5, retries: 0 });
    addIntent({ id: 'ghost-Y', type: 'P', payload: {}, priority: 1, retries: 0 });
    const filtered = getIntentsByPriority(1);
    expect(filtered.length).toBe(1);
    expect(filtered[0].id).toBe('ghost-Y');
  });

  // Test getting intents by user ID pattern
  test('getIntentsByUserIdPattern supports regex', () => {
    addIntent({ id: 'ghost-100', type: 'REGEX', payload: { userId: 'USR-999' }, priority: 0, retries: 0 });
    addIntent({ id: 'ghost-101', type: 'REGEX', payload: { userId: 'BOT-000' }, priority: 0, retries: 0 });
    const matches = getIntentsByUserIdPattern('^USR-');
    expect(matches.length).toBe(1);
    expect(matches[0].id).toBe('ghost-100');
  });

  // Test getting queue count
    test('getQueueCount returns correct count', () => {
        expect(getQueueCount()).toBe(0);
        addIntent({ id: 'ghost-1', type: 'COUNT', payload: {}, priority: 0, retries: 0 });
        expect(getQueueCount()).toBe(1);
        addIntent({ id: 'ghost-2', type: 'COUNT', payload: {}, priority: 0, retries: 0 });
        expect(getQueueCount()).toBe(2);
    });

    // Test getting queue returns all intents
    test('getQueue returns all intents', () => {
        addIntent({ id: 'ghost-1', type: 'QUEUE', payload: {}, priority: 0, retries: 0 });
        addIntent({ id: 'ghost-2', type: 'QUEUE', payload: {}, priority: 0, retries: 0 });
        const queue = getQueue();
        expect(queue.length).toBe(2);
        expect(queue[0].id).toBe('ghost-1');
        expect(queue[1].id).toBe('ghost-2');
    });

    // Test getting intents by action
    test('getIntentsByAction filters correctly', () => {
        addIntent({ id: 'ghost-1', type: 'ACTION', payload: { action: 'test' }, priority: 0, retries: 0 });
        addIntent({ id: 'ghost-2', type: 'ACTION', payload: { action: 'test' }, priority: 0, retries: 0 });
        addIntent({ id: 'ghost-3', type: 'ACTION', payload: { action: 'other' }, priority: 0, retries: 0 });
        const filtered = getIntentsByAction('test');
        expect(filtered.length).toBe(2);
        expect(filtered[0].id).toBe('ghost-1');
        expect(filtered[1].id).toBe('ghost-2');
    });

    // Test getting intents by target
    test('getIntentsByTarget filters correctly', () => {
        addIntent({ id: 'ghost-1', type: 'TARGET', payload: { target: 'A' }, priority: 0, retries: 0 });
        addIntent({ id: 'ghost-2', type: 'TARGET', payload: { target: 'B' }, priority: 0, retries: 0 });
        const filtered = getIntentsByTarget('A');
        expect(filtered.length).toBe(1);
        expect(filtered[0].id).toBe('ghost-1');
    });

    // Test getting intents by user ID
    test('getIntentsByTimestamp filters correctly', () => {
        const now = Date.now();
        addIntent({ id: 'ghost-1', type: 'TIMESTAMP', payload: { timestamp: now }, priority: 0, retries: 0 });
        addIntent({ id: 'ghost-2', type: 'TIMESTAMP', payload: { timestamp: now + 1000 }, priority: 0, retries: 0 });
        const filtered = getIntentsByTimestamp(now);
        expect(filtered.length).toBe(1);
        expect(filtered[0].id).toBe('ghost-1');
    });

    // Test getting intents by user ID
    test('getIntentsByUserId filters correctly', () => {
        addIntent({ id: 'ghost-1', type: 'USER', payload: { userId: 'USR-001' }, priority: 0, retries: 0 });
        addIntent({ id: 'ghost-2', type: 'USER', payload: { userId: 'USR-002' }, priority: 0, retries: 0 });
        const filtered = getIntentsByUserId('USR-001');
        expect(filtered.length).toBe(1);
        expect(filtered[0].id).toBe('ghost-1');
    });

    // Test getting intents by user ID pattern
    test('getIntentsByUserIdPattern supports regex', () => {
        addIntent({ id: 'ghost-100', type: 'USER_PATTERN', payload: { userId: 'USR-999' }, priority: 0, retries: 0 });
        addIntent({ id: 'ghost-101', type: 'USER_PATTERN', payload: { userId: 'BOT-000' }, priority: 0, retries: 0 });
        const matches = getIntentsByUserIdPattern('^USR-');
        expect(matches.length).toBe(1);
        expect(matches[0].id).toBe('ghost-100');
    });

    // Test getting intents by action ID
    test('getIntentsByActionId filters correctly', () => {
        addIntent({ id: 'ghost-1', type: 'ACTION_ID', payload: { actionId: 'test' }, priority: 0, retries: 0 });
        addIntent({ id: 'ghost-2', type: 'ACTION_ID', payload: { actionId: 'test' }, priority: 0, retries: 0 });
        addIntent({ id: 'ghost-3', type: 'ACTION_ID', payload: { actionId: 'other' }, priority: 0, retries: 0 });
        const filtered = getIntentsByActionId('test');
        expect(filtered.length).toBe(2);
        expect(filtered[0].id).toBe('ghost-1');
        expect(filtered[1].id).toBe('ghost-2');
    });

    // Test getting intents by target ID
    test('getIntentsByTargetId filters correctly', () => {
        addIntent({ id: 'ghost-1', type: 'TARGET_ID', payload: { targetId: 'A' }, priority: 0, retries: 0 });
        addIntent({ id: 'ghost-2', type: 'TARGET_ID', payload: { targetId: 'B' }, priority: 0, retries: 0 });
        const filtered = getIntentsByTargetId('A');
        expect(filtered.length).toBe(1);
        expect(filtered[0].id).toBe('ghost-1');
    });

    // Test getting intents by priority ID
    test('getIntentsByPriorityId filters correctly', () => {
        addIntent({ id: 'ghost-1', type: 'PRIORITY_ID', payload: { priorityId: 1 }, priority: 1, retries: 0 });
        addIntent({ id: 'ghost-2', type: 'PRIORITY_ID', payload: { priorityId: 2 }, priority: 2, retries: 0 });
        const filtered = getIntentsByPriorityId(1);
        expect(filtered.length).toBe(1);
        expect(filtered[0].id).toBe('ghost-1');
    });

    // Test getting intents by retries ID
    test('getIntentsByRetriesId filters correctly', () => {
        addIntent({ id: 'ghost-1', type: 'RETRIES_ID', payload: { retriesId: 1 }, priority: 0, retries: 1 });
        addIntent({ id: 'ghost-2', type: 'RETRIES_ID', payload: { retriesId: 2 }, priority: 0, retries: 2 });
        const filtered = getIntentsByRetriesId(1);
        expect(filtered.length).toBe(1);
        expect(filtered[0].id).toBe('ghost-1');
    });

    // Test getting intents by timestamp ID
    test('getIntentsByTimestampId filters correctly', () => {
        const now = Date.now();
        addIntent({ id: 'ghost-1', type: 'TIMESTAMP_ID', payload: { timestampId: now }, priority: 0, retries: 0 });
        addIntent({ id: 'ghost-2', type: 'TIMESTAMP_ID', payload: { timestampId: now + 1000 }, priority: 0, retries: 0 });
        const filtered = getIntentsByTimestampId(now);
        expect(filtered.length).toBe(1);
        expect(filtered[0].id).toBe('ghost-1');
    });

    // Test resetting queue clears all intents
    test('resetQueue clears all intents', () => {
        addIntent({ id: 'ghost-1', type: 'RESET', payload: {}, priority: 0, retries: 0 });
        expect(getQueueCount()).toBe(1);
        resetQueue();
        expect(getQueueCount()).toBe(0);
    });

    // Test saving handles serialization error
    test('save handles serialization error', () => {
        const badIntent = {};
        badIntent.circular = badIntent; // circular reference
        expect(() => PersistentGhostQueue.save([badIntent])).not.toThrow();
        const queue = PersistentGhostQueue.load();
        expect(queue.length).toBe(0); // no intent should be saved
    });

    // Test loading handles parsing error
    test('load handles parsing error', () => {
        localStorage.setItem('ghostQueue', 'not a json');
        const queue = PersistentGhostQueue.load();
        expect(queue).toEqual([]); // returns empty array on parse error
    });

    // Test clearing handles removal error
    test('clear handles removal error', () => {
        localStorage.setItem('ghostQueue', '[]'); // set valid JSON
        expect(() => PersistentGhostQueue.clear()).not.toThrow();
        expect(localStorage.getItem('ghostQueue')).toBeNull(); // item should be removed
    });

    // Test getting intents by retries
    test('getIntentsByRetries filters correctly', () => {
        addIntent({ id: 'ghost-1', type: 'RETRIES', payload: {}, priority: 0, retries: 1 });
        addIntent({ id: 'ghost-2', type: 'RETRIES', payload: {}, priority: 0, retries: 2 });
        const filtered = getIntentsByRetries(1);
        expect(filtered.length).toBe(1);
        expect(filtered[0].id).toBe('ghost-1');
    });

    // Test getting intents by type ID
    test('getIntentsByTypeId filters correctly', () => {
        addIntent({ id: 'ghost-1', type: 'TYPE_ID', payload: { typeId: 'TYPE_ID' }, priority: 0, retries: 0 });
        addIntent({ id: 'ghost-2', type: 'TYPE_ID', payload: { typeId: 'TYPE_ID' }, priority: 0, retries: 0 });
        const filtered = getIntentsByTypeId('TYPE_ID');
        expect(filtered.length).toBe(2);
        expect(filtered[0].id).toBe('ghost-1');
        expect(filtered[1].id).toBe('ghost-2');
    });

    // Test getting intents by retries ID
    test('save handles serialization error', () => {
        const badIntent = {};
        badIntent.circular = badIntent; // kruhová reference
        expect(() => PersistentGhostQueue.save([badIntent])).not.toThrow();
        const queue = PersistentGhostQueue.load();
        expect(queue.length).toBe(0); // žádný záměr by neměl být uložen
    });

    // Test loading handles parsing error
    test('load handles parsing error', () => {
        localStorage.setItem('ghostQueue', 'not a json');
        const queue = PersistentGhostQueue.load();
        expect(queue).toEqual([]); // vrátí prázdné pole při chybě parsování
    });

    // Test clearing handles removal error
    test('clear handles removal error', () => {
        localStorage.setItem('ghostQueue', '[]'); // nastavíme platný JSON
        expect(() => PersistentGhostQueue.clear()).not.toThrow();
        expect(localStorage.getItem('ghostQueue')).toBeNull(); // položka by měla být odstraněna
    });

});