type Token =
  | { type: 'OPERAND'; value: number }
  | { type: 'OPERATOR' | 'UNKNOWN'; value: string };

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

function buildAST(tokens: Token[], priority: Record<string, number>): Node | number {
  const tree: (Node | number)[] = [];
  const output: (Token | number)[] = [];
  const operators: Token[] = [];

  if (tokens[0].type === 'UNKNOWN') {
    throw new Error('Unknown operation');
  }

  for (let i = 0; i < tokens.length; i++) {
    const token: Token = tokens[i];
    const nextToken: Token = tokens[i + 1];

    if (token.type === 'OPERAND') {
      if (nextToken?.type === 'UNKNOWN') {
        throw new Error('Unknown operation');
      }

      if (nextToken?.type === 'OPERAND') {
        throw new Error('Syntax error');
      }

      output.push(token.value);
    } else if (token.type === 'OPERATOR') {
      if (nextToken?.type !== 'OPERAND') {
        throw new Error('Syntax error');
      }

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

  for (const item of output) {
    if (typeof item === 'number') {
      tree.push(item);
    } else if (item.type === 'OPERATOR') {
      const right: number | Node = tree.pop()!;
      const left: number | Node = tree.pop()!;
      tree.push(new Node(item.value, left, right));
    }
  }

  return tree[0];
}

function lexer(question: string): Token[] {
  const sanitizedQuestion = question
    .replace(/^What is|\?$/g, '')
    .replace(/\?$/, '')
    .replace(/multiplied by/g, 'multiplied')
    .replace(/divided by/g, 'divided')
    .trim();

  if (sanitizedQuestion.length < 1) {
    throw new Error('Syntax error');
  }

  const tokens: Token[] = [];
  const words: string[] = sanitizedQuestion.split(/\s+/);
  const operators: string[] = ['plus', 'minus', 'multiplied', 'divided'];

  words.forEach(word => {
    const num = Number(word);
    if (!isNaN(Number(word))) {
      tokens.push({type: 'OPERAND', value: num});
    } else if (operators.includes(word)) {
      tokens.push({type: 'OPERATOR', value: word});
    } else {
      tokens.push({type: 'UNKNOWN', value: word});
    }
  });

  return tokens;
}

export function answer(question: string): number {
  const tokens: Token[] = lexer(question);
  const priority = {
    plus: 1,
    minus: 1,
    multiplied: 1,
    divided: 1
  };
  const ast: number | Node = buildAST(tokens, priority);

  return evaluateAST(ast);
}

export function answerAlgebraicallyCorrect(question: string): number {
  const tokens: Token[] = lexer(question);
  const priority = {
    plus: 1,
    minus: 1,
    multiplied: 2,
    divided: 2
  };
  const ast: number | Node = buildAST(tokens, priority);

  return evaluateAST(ast);
}

function evaluateAST(node: Node | number): number {
  if (typeof node === 'number') return node;

  const left: number = evaluateAST(node.leftOperand!);
  const right: number = evaluateAST(node.rightOperand!);

  switch (node.operator) {
    case 'plus':
      return left + right;
    case 'minus':
      return left - right;
    case 'multiplied':
      return left * right;
    case 'divided':
      return left / right;
    default:
      throw new Error(`Unknown operator: ${node.operator}`);
  }
}
