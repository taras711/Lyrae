
/*

This test suite contains tests for the SecureIntentWrapper.

*/

const secureIntentWrapper = require('../../sectors/orchestration/SecureIntentWrapper');
test('fallback is triggered when intent is invalid', async () => {
  const mockIntent = {
    id: 'invalidIntent',
    action: null, // Simulating an invalid intent
  };

  const mockFallback = {
    id: 'safeFallback',
    action: async () => 'Fallback neutralized',
  };

  const wrapper = secureIntentWrapper({
    intent: mockIntent,
    fallback: mockFallback,
    token: { permissions: ['execute_intent'], revoked: false },
  });

  const result = await wrapper.run();
  expect(result.result).toBe('Fallback neutralized');
  expect(result.fallbackTriggered).toBe(true);
});

test('triggers fallback when intent is missing', async () => {
    const wrapper = secureIntentWrapper({
        intent: null,
        fallback: {
            id: 'backup',
            action: async () => 'Default',
        },
        token: { permissions: ['execute_intent'], revoked: false },
    });

    const result = await wrapper.run();
    expect(result.result).toBe('Default');
    expect(result.fallbackTriggered).toBe(true);
});