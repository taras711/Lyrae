describe('GhostIntentManager – Concurrency Tests', () => {
  const manager = new GhostIntentManager();

  it('handles simultaneous inserts without collision', async () => {
    const intents = Array.from({ length: 100 }, (_, i) => ({
      id: `intent-${i}`,
      payload: { text: `Concurrent ${i}` },
      type: 'test'
    }));
    await Promise.all(intents.map(intent => manager.addIntent(intent)));
    const queue = await manager.getQueue();
    expect(queue).toHaveLength(100);
  });

  it('preserves consistency during concurrent removals', async () => {
    const ids = Array.from({ length: 100 }, (_, i) => `intent-${i}`);
    await Promise.all(ids.map(id => manager.removeIntentById(id)));
    const queueCount = await manager.getQueueCount();
    expect(queueCount).toBe(0);
  });
});