export function commands(number: number): string[] {
  const actions = ['wink', 'double blink', 'close your eyes', 'jump'];
  const result: string[] = [];

  for (let i = 0; i < actions.length; i++) {
    if (number % 2 === 1 && number > 0) {
      result.push(actions[i])
    }
    number = Math.floor(number / 2);
  }

  if (number === 1) {
    return result.reverse();
  }

  return result;
}
