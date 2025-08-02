  /*

This test suite contains tests for the SecureIntentWrapper.

*/

const secureIntentWrapper = require('../../sectors/orchestration/SecureIntentWrapper');

test('fallback is triggered when intent throws error', async () => {
  const mockIntent = {
    id: 'explosiveIntent',
    action: async () => {
      throw new Error('Boom!');
    },
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