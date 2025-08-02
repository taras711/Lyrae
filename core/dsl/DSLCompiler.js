// DSLCompiler.js

function tokenize(input) {
  const regex = /\s*(=>|==|!=|<=|>=|<|>|\(|\)|"[^"]*"|[\w\.]+)\s*/g;
  const tokens = [];
  let match;

  while ((match = regex.exec(input)) !== null) {
    const value = match[1];
    let type = 'UNKNOWN';

    if (['IF', 'THEN', 'AND', 'OR', 'NOT'].includes(value)) type = 'KEYWORD';
    else if (['==', '!=', '<', '>', '<=', '>='].includes(value)) type = 'OPERATOR';
    else if (/^"[^"]*"$/.test(value)) type = 'STRING';
    else if (value === '(') type = 'LPAREN';
    else if (value === ')') type = 'RPAREN';
    else if (/^[\w\.]+$/.test(value)) type = 'IDENTIFIER';

    tokens.push({ type, value });
  }

  return tokens;
}

function parseTokens(tokens) {
  let i = 0;

  function expect(type) {
    const token = tokens[i++];
    if (!token || token.type !== type) throw new Error(`Expected ${type}, got ${token?.type}`);
    return token;
  }

  function parseExpression() {
    const left = expect('IDENTIFIER');
    const operator = expect('OPERATOR');
    const right = expect('STRING');
    return {
      type: 'BinaryExpression',
      left,
      operator: operator.value,
      right
    };
  }

  function parseFunctionCall() {
    const func = expect('IDENTIFIER');
    expect('LPAREN');
    const arg = expect('STRING');
    expect('RPAREN');
    return {
      type: 'FunctionCall',
      name: func.value,
      arguments: [arg.value.replace(/"/g, '')]
    };
  }

  function parseStatement() {
    expect('KEYWORD'); // IF
    const condition = parseExpression();
    expect('KEYWORD'); // THEN
    const consequence = parseFunctionCall();
    return {
      type: 'IfStatement',
      condition,
      consequence
    };
  }

  return parseStatement();
}

function validateAST(ast) {
  if (ast.type !== 'IfStatement') throw new Error('Root must be IfStatement');
  if (!ast.condition || !ast.consequence) throw new Error('Missing condition or consequence');
}

module.exports = {
  tokenize,
  parseTokens,
  validateAST
};