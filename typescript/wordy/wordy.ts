type Token = { type: 'OPERAND' | 'OPERATOR' | 'UNKNOWN'; value: string };
class Node {
  operator: string;
  leftOperand: Node | number| null;
  rightOperand: Node | number | null;

  constructor(operator: string, leftOperand: Node | null, rightOperand: Node | null) {
    this.operator = operator;
    this.leftOperand = leftOperand;
    this.rightOperand = rightOperand;
  }
}

type AstNode = Node | number| null

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

const parser(tokens: Token[]): Node {

}

export const answer = (question: string): number => {

  const tokens: Token[] = lexer(question);

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
