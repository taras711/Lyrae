/*

This test suite contains unit tests for the GhostIntentManager.

*/

it('does not overwrite existing intent on duplicate ID', async () => {
  await manager.addIntent({ id: 'dup', payload: 'first' });
  await manager.addIntent({ id: 'dup', payload: 'second' });
  const intent = await manager.getIntentById('dup');
  expect(intent.payload).toBe('first'); // nebo test overwrite podle designu
});