const allowedFunctions = ['send', 'log', 'notify'];

function validateAST(ast) {
  if (ast.type !== 'IfStatement') throw new Error('Root must be IfStatement');
  if (!ast.condition || !ast.consequence) throw new Error('Missing condition or consequence');

  const funcName = ast.consequence.name;
  if (!allowedFunctions.includes(funcName)) {
    throw new Error(`Unknown function: ${funcName}`);
  }
}
