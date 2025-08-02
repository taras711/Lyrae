// DSLRuntime.js

function evaluate(ast, context) {
  if (ast.type !== 'IfStatement') throw new Error('Unsupported AST root');

  const condition = ast.condition;
  const leftValue = resolveIdentifier(condition.left.value, context);
  const rightValue = stripQuotes(condition.right.value);

  const result = compare(leftValue, condition.operator, rightValue);

  if (result) {
    executeFunction(ast.consequence, context);
  } else {
    console.log('🔕 Condition not met, no action taken.');
  }
}

function resolveIdentifier(path, context) {
  const parts = path.split('.');
  let value = context;
  for (const part of parts) {
    value = value?.[part];
  }
  return value;
}

function stripQuotes(str) {
  return str.replace(/^"|"$/g, '');
}

function compare(left, operator, right) {
  switch (operator) {
    case '==': return left == right;
    case '!=': return left != right;
    case '>': return left > right;
    case '<': return left < right;
    case '>=': return left >= right;
    case '<=': return left <= right;
    default: throw new Error(`Unsupported operator: ${operator}`);
  }
}

function executeFunction(funcCall, context) {
  const name = funcCall.name;
  const args = funcCall.arguments;

  if (name === 'trigger') {
    console.log(`🚨 Triggering action: ${args[0]}`);
  } else {
    console.log(`⚙️ Unknown function: ${name}`);
  }
}

module.exports = {
  evaluate
};