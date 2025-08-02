// testDSLRuntime.js

const { tokenize, parseTokens, validateAST } = require('../../core/dsl/DSLCompiler');
const { evaluate } = require('../../core/dsl/DSLRuntime');

const input = 'IF user.role == "admin" THEN trigger("override")';

const context = {
  user: {
    role: 'admin'
  }
};

try {
  const tokens = tokenize(input);
  const ast = parseTokens(tokens);
  validateAST(ast);

  console.log('✅ AST is valid, evaluating...');
  evaluate(ast, context);
} catch (err) {
  console.error('❌ Error:', err.message);
}