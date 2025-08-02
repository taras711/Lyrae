/*

This test suite contains queue behavior tests for the GhostIntentManager.

*/

describe('GhostIntentManager – Queue Behavior', () => {
  const manager = new GhostIntentManager();

  it('filters intents by timestamp', async () => {
    await manager.addIntent({ id: 'past', timestamp: 1000 });
    await manager.addIntent({ id: 'future', timestamp: Date.now() + 100000 });
    const filtered = await manager.getIntentsByTimestamp(Date.now());
    expect(filtered).toEqual(expect.arrayContaining([{ id: 'future' }]));
  });

  it('resets queue correctly', async () => {
    await manager.resetQueue();
    const queue = await manager.getQueue();
    expect(queue).toHaveLength(0);
  });

  it('filters intents by priority level', async () => {
    await manager.addIntent({ id: 'high', priority: 'urgent' });
    const result = await manager.getIntentsByPriority('urgent');
    expect(result[0].id).toBe('high');
  });
});