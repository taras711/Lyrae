const FallbackIntentHandler = require('../../sectors/orchestration/FallbackIntentHandler');

describe('FallbackIntentHandler', () => {
  it('should trigger fallback when primary intent fails', async () => {
    const intents = {
      primary: { id: 'A', action: () => Promise.reject(new Error('Primary failed')) },
      fallback: { id: 'B', action: () => Promise.resolve('Fallback executed') },
    };

    const handler = new FallbackIntentHandler(intents);
    const result = await handler.run();

    expect(result).toEqual({
      fallbackTriggered: true,
      intentRun: 'B',
      output: 'Fallback executed'
    });
  });
});