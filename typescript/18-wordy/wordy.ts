type ValidToken =
  | { type: 'OPERAND'; value: number }
  | { type: 'OPERATOR'; value: string };

type Token =
  | ValidToken
  | { type: 'UNKNOWN'; value: string };

class Node {
  operator: string;
  leftOperand: Node | number;
  rightOperand: Node | number;

  constructor(operator: string, leftOperand: Node | number, rightOperand: Node | number) {
    this.operator = operator;
    this.leftOperand = leftOperand;
    this.rightOperand = rightOperand;
  }
}

function preValidateTokens(tokens: Token[]): ValidToken[] {
  tokens.forEach((val, i) => {
    if (val.type === 'UNKNOWN') throw new Error('Unknown operation')
    if (i > 0 && (val.type === tokens[i - 1].type || tokens.length < 3)) throw new Error('Syntax error')
  })

  return tokens as ValidToken[];
}

function buildAST(tokens: ValidToken[], priority: Record<string, number>): Node | number {
  const trees: (Node | number)[] = [];
  const reorderingOutputRPN: ValidToken[] = [];
  const operators: ValidToken[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token: Token = tokens[i];

    if (token.type === 'OPERAND') {
      reorderingOutputRPN.push(token);
    } else if (token.type === 'OPERATOR') {
      while (operators.length > 0 && priority[operators[operators.length - 1].value]
      >= priority[token.value]) {
        reorderingOutputRPN.push(operators.pop()!);
      }
      operators.push(token);
    }
  }

  while (operators.length > 0) {
    reorderingOutputRPN.push(operators.pop()!);
  }

  for (const item of reorderingOutputRPN) {
    if (item.type === 'OPERAND') {
      trees.push(item.value);
    } else if (item.type === 'OPERATOR') {
      const right: number | Node = trees.pop()!;
      const left: number | Node = trees.pop()!;
      trees.push(new Node(item.value, left, right));
    }
  }

  if (trees.length !== 1) {
    throw new Error('Syntax error: Invalid tree');
  }

  return trees[0];
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
    if (!isNaN(num)) {
      tokens.push({type: 'OPERAND', value: num});
    } else if (operators.includes(word)) {
      tokens.push({type: 'OPERATOR', value: word});
    } else {
      tokens.push({type: 'UNKNOWN', value: word});
    }
  });

  return tokens;
}

function evaluateAST(node: Node | number): number {
  if (typeof node === 'number') return node;

  const left: number = evaluateAST(node.leftOperand);
  const right: number = evaluateAST(node.rightOperand);

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

function calculate(question: string, priority: Record<string, number>): number {
  const tokens: Token[] = lexer(question);
  const validTokens: ValidToken[] = preValidateTokens(tokens);
  if (validTokens.length === 1) {
    return Number(validTokens[0].value);
  }
  const ast: number | Node = buildAST(validTokens, priority);
  return evaluateAST(ast);
}

export function answer(question: string): number {
  const priority = {
    plus: 1,
    minus: 1,
    multiplied: 1,
    divided: 1,
  };
  return calculate(question, priority);
}

export function answerAlgebraicallyCorrect(question: string): number {
  const priority = {
    plus: 1,
    minus: 1,
    multiplied: 2,
    divided: 2,
  };
  return calculate(question, priority);
}
