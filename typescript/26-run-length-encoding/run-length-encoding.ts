export function encode(str: string): string {
  if (str.length === 0) return "";

  let newStr = "";
  let count = 1;

  for (let i = 1; i < str.length; i++) {
    const prevVal = str[i - 1];
    const currVal = str[i];

    if (prevVal === currVal) {
      count++;
    } else {
      newStr += count > 1 ? `${count}${currVal}` : currVal;
      count = 1;
    }
  }

  return newStr;
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
