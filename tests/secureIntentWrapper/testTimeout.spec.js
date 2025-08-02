/*

This test suite contains tests for the SecureIntentWrapper.

*/

const secureIntentWrapper = require('../../sectors/orchestration/SecureIntentWrapper');

test('fallback is triggered on timeout', async () => {
  const mockIntent = {
    id: 'slowIntent',
    action: async () => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      return 'Too late!';
    }
  };

  const mockFallback = {
    id: 'quickFallback',
    action: async () => 'Fallback activated',
  };

  const wrapper = secureIntentWrapper({
    intent: mockIntent,
    fallback: mockFallback,
    token: { permissions: ['execute_intent'], revoked: false },
  });

  const result = await wrapper.run();
  expect(result.result).toBe('Fallback activated');
  expect(result.fallbackTriggered).toBe(true);
});