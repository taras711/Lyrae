
/*

This test suite contains tests for the SecureIntentWrapper.

*/

const secureIntentWrapper = require('../../sectors/orchestration/SecureIntentWrapper');

test('both intent and fallback fail gracefully', async () => {
  const mockIntent = {
    id: 'intentFailer',
    action: async () => {
      throw new Error('Intent failed');
    },
  };

  const mockFallback = {
    id: 'fallbackFailer',
    action: async () => {
      throw new Error('Fallback also failed');
    },
  };

  const wrapper = secureIntentWrapper({
    intent: mockIntent,
    fallback: mockFallback,
    token: { permissions: ['execute_intent'], revoked: false },
  });

  await expect(wrapper.run()).rejects.toThrow('Fallback also failed');
});