const secureIntentWrapper = require('../../sectors/orchestration/SecureIntentWrapper');

test('executes intent successfully within timeout', async () => {
  const mockIntent = {
    id: 'helloWorld',
    action: async () => 'Hello!',
  };

  const mockFallback = {
    id: 'fallbackHello',
    action: async () => 'Fallback!',
  };

  const wrapper = secureIntentWrapper({
    intent: mockIntent,
    fallback: mockFallback,
    token: { permissions: ['execute_intent'], revoked: false },
  });

  const result = await wrapper.run();
  expect(result.result).toBe('Hello!');
  expect(result.fallbackTriggered).toBe(false);
});