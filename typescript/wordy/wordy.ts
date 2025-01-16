type Token = { type: 'NUMBER' | 'OPERATOR' | 'UNKNOWN'; value: string };

export const lexer = (question: string): Token[] => {
  const sanitizedQuestion = question.replace(/^What is |\?$/g, '').trim();
  const tokens: Token[] = [];
  const words = sanitizedQuestion.split(/\s+/);
  const operators: string[] = ['plus', 'minus', 'multiplied by', 'divided by'];

  words.forEach(word => {
    if (/^\d+$/.test(word)) {
      tokens.push({ type: 'NUMBER', value: word });
    } else if (operators.includes(word)) {
      tokens.push({ type: 'OPERATOR', value: word });
    } else {
      tokens.push({ type: 'UNKNOWN', value: word });
    }
  });

  return tokens;
};

export const answer = (question: string): number => {
  const tokens = lexer(question);

  let result = parseInt(tokens[0].value);

  for (let i = 1; i < tokens.length; i++) {
    const operator = tokens[i];
    const operand = tokens[i + 1];
  }

  return result;
};
