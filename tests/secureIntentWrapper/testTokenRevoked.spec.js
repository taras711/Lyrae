/*

This test suite contains tests for the SecureIntentWrapper.

*/

const secureIntentWrapper = require('../../sectors/orchestration/SecureIntentWrapper');

test('fallback is triggered on revoked token', async () => {
  const mockIntent = {
    id: 'secureAction',
    action: async () => 'Secure access',
  };

  const mockFallback = {
    id: 'accessDeniedFallback',
    action: async () => 'Access denied fallback',
  };

  const wrapper = secureIntentWrapper({
    intent: mockIntent,
    fallback: mockFallback,
    token: { permissions: [], revoked: true },
  });

  const result = await wrapper.run();
  expect(result.result).toBe('Access denied fallback');
  expect(result.fallbackTriggered).toBe(true);
});