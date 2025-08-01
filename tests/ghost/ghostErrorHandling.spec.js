describe('GhostIntentManager – Error Handling', () => {
  const manager = new GhostIntentManager();

  it('throws on serialization failure during save', async () => {
    const circular = {};
    circular.self = circular;
    await expect(manager.save(circular)).rejects.toThrow(/Converting circular structure to JSON/);
  });

  it('gracefully handles malformed JSON during load', async () => {
    // Mock storage to return broken JSON
    jest.spyOn(manager, 'loadRaw').mockResolvedValue('{ bad json }');
    await expect(manager.load()).rejects.toThrow(/Unexpected token/);
  });

  it('handles failure when clearing storage', async () => {
    jest.spyOn(manager, 'removeAll').mockImplementation(() => {
      throw new Error('Storage clear failed');
    });
    await expect(manager.clear()).rejects.toThrow('Storage clear failed');
  });
});