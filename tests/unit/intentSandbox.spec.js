const IntentSandboxRunner = require('../../sectors/orchestration/IntentSandboxRunner')

describe('IntentSandboxRunner', () => {
  it('should simulate intent without errors', async () => {
    const intents = [
      { id: 'A', action: () => Promise.resolve('A done') },
    ];
    const runner = new IntentSandboxRunner(intents);
    await runner.run();
  });
});