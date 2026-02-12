function heapPermutations(): number[][] {
  const result: number[][] = [];
  const digits: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const n = digits.length;
  const c: number[] = new Array<number>(n).fill(0);

  result.push([...digits]);

  let i = 0;
  while (i < n) {
    if (c[i] < i) {
      if (i % 2 === 0) {
        [digits[0], digits[i]] = [digits[i], digits[0]];
      } else {
        [digits[c[i]], digits[i]] = [digits[i], digits[c[i]]];
      }
      result.push([...digits]);
      c[i]++;
      i = 0;
    } else {
      c[i] = 0;
      i++;
    }
  }
  return result;
}

const allVariants: number[][] = heapPermutations();

export function solve(puzzle: string): Record<string, number> | undefined {
  const parts: string[] = puzzle.split(/ == | \+ /);
  const words: string[] = parts.slice(0, -1);
  const targetWord: string = parts[parts.length - 1];

  const uniqueLetters: string[] = [...new Set(puzzle.match(/[A-Z]/g))];
  const leadingLetters = new Set(parts.map(w => w[0]));
  const lettersLength = uniqueLetters.length;

  if (lettersLength > 10) return;

  for (let v = 0; v < allVariants.length; v++) {
    const nums: number[] = allVariants[v];

    let hasLeadingZero = false;
    for (let i = 0; i < lettersLength; i++) {
      if (nums[i] === 0 && leadingLetters.has(uniqueLetters[i])) {
        hasLeadingZero = true;
        break;
      }
    }
    if (hasLeadingZero) continue;

    const mapping: { [key: string]: number } = {};
    for (let i = 0; i < lettersLength; i++) {
      mapping[uniqueLetters[i]] = nums[i];
    }

    let currentSum = 0;
    for (const word of words) {
      let num = 0;
      for (let charId = 0; charId < word.length; charId++) {
        num = num * 10 + mapping[word[charId]];
      }
      currentSum += num;
    }

    let targetNum = 0;
    for (let charId = 0; charId < targetWord.length; charId++) {
      targetNum = targetNum * 10 + mapping[targetWord[charId]];
    }

    if (currentSum === targetNum) {
      return mapping;
    }
  }
}
