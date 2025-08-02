// testDSLCompiler.js

const { tokenize, parseTokens, validateAST } = require("../../core/dsl/DSLCompiler")

const input = 'IF user.role == "admin" THEN trigger("override")';

try {
  const tokens = tokenize(input);
  console.log('🔹 Tokens:', tokens);

  const ast = parseTokens(tokens);
  console.log('🔸 AST:', JSON.stringify(ast, null, 2));

  validateAST(ast);
  console.log('✅ AST is valid!');
} catch (err) {
  console.error('❌ Error:', err.message);
}
