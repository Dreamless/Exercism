export function encode(str: string): string {
  if (str.length === 0) return "";

  let result = "";
  let count = 1;
  let prevChar = str[0];

  for (let i = 1; i < str.length; i++) {
    const currChar = str[i];

    if (prevChar === currChar) {
      count++;
    } else {
      result += count > 1 ? `${count}${prevChar}` : prevChar;
      count = 1;
      prevChar = currChar;
    }
  }

  result += count > 1 ? `${count}${prevChar}` : prevChar;

  return result;
}

export function decode(str: string): string {
  let newStr = "";
  const matches: RegExpMatchArray | null = str.match(/\d+.|./g);

  if (matches === null) return ""

  for (let i = 0; i < matches.length; i++) {
    if (matches[i].length > 1) {
      const currVal = matches[i].split('');
      const letter: string = currVal.pop()!;
      const num = Number(currVal.join(''));

      newStr += letter.repeat(num);
    } else {
      newStr += matches[i];
    }
  }

  return newStr;
}
