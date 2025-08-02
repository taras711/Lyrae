/*

This test suite contains stress tests for the GhostIntentManager.

*/

describe('GhostIntentManager – Stress Tests', () => {
  const manager = new GhostIntentManager();

  it('survives queue overflow', async () => {
    const overload = Array.from({ length: 10000 }, (_, i) => ({
      id: `overload-${i}`,
      payload: { data: i },
      type: 'stress'
    }));
    await Promise.all(overload.map(intent => manager.addIntent(intent)));
    const count = await manager.getQueueCount();
    expect(count).toBe(10000);
  });

  it('detects zombie intents after removal', async () => {
    await manager.removeIntentById('overload-9999');
    const intent = await manager.getIntentById('overload-9999');
    expect(intent).toBeNull();
  });
});