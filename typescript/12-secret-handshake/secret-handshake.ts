export function commands(number: number): string[] {
  const actions = ['wink', 'double blink', 'close your eyes', 'jump'];
  const bin = number.toString(2).padStart(5, '0');
  const result: string[] = [];

  for (let i = 0; i < 4; i++) {
    if (bin[4 - i] === '1') {
      result.push(actions[i]);
    }
  }

  if (bin[0] === '1') {
    result.reverse();
  }

  return result;
}
