type Token = { type: 'OPERAND' | 'OPERATOR' | 'UNKNOWN'; value: string };

class Node {
  operator: string;
  leftOperand: Node | number | null;
  rightOperand: Node | number | null;

  constructor(operator: string, leftOperand: Node | number | null, rightOperand: Node | number | null) {
    this.operator = operator;
    this.leftOperand = leftOperand;
    this.rightOperand = rightOperand;
  }
}

function buildAST(tokens: Token[]): Node | number {
  const priority: Record<string, number> = {
    'plus': 1,
    'minus': 1,
    'multiplied': 2,
    'divided': 2
  };

  const output: (Token | number)[] = [];
  const operators: Token[] = [];

  for (const token of tokens) {
    if (token.type === 'OPERAND') {
      output.push(Number(token.value));
    } else if (token.type === 'OPERATOR') {
      while (
        operators.length > 0 &&
        priority[operators[operators.length - 1].value] >= priority[token.value]
        ) {
        output.push(operators.pop()!);
      }
      operators.push(token);
    }
  }

  while (operators.length > 0) {
    output.push(operators.pop()!);
  }

  const tree: (Node | number)[] = [];

  for (const item of output) {
    if (typeof item === 'number') {
      tree.push(item);
    } else if (item.type === 'OPERATOR') {
      const right = tree.pop()!;
      const left = tree.pop()!;
      tree.push(new Node(item.value, left, right));
    }
  }

  return tree[0];
}

export const lexer = (question: string): Token[] => {
  const sanitizedQuestion = question
    .replace(/^What is |\?$/g, '')
    .replace(/\?$/, '')
    .replace(/multiplied by/g, 'multiplied')
    .replace(/divided by/g, 'divided')
    .trim();
  const tokens: Token[] = [];
  const words = sanitizedQuestion.split(/\s+/);
  const operators: string[] = ['plus', 'minus', 'multiplied', 'divided'];

  words.forEach(word => {
    if (!isNaN(Number(word))) {
      tokens.push({ type: 'OPERAND', value: word });
    } else if (operators.includes(word)) {
      tokens.push({ type: 'OPERATOR', value: word });
    } else {
      tokens.push({ type: 'UNKNOWN', value: word });
    }
  });

  return tokens;
};


export const answer = (question: string): number => {

  const tokens: Token[] = lexer(question);
  const ast = buildAST(tokens)
  console.log(ast);

  if (tokens.length === 0) throw new Error("Syntax error");

  let result = Number(tokens[0].value);
  let i = 1;

  while (i < tokens.length) {
    const operator = tokens[i++];
    const next: Token = tokens[i++];
    const nextVal = Number(next.value);

    switch (operator.value) {
      case 'plus':
        result += nextVal;
        break;
      case 'minus':
        result -= nextVal;
        break;
      case 'multiplied':
        result *= nextVal;
        break;
      case 'divided':
        result /= nextVal;
        break;
      default:
        throw new Error("Unknown operation");
    }
  }

  return result;
};
