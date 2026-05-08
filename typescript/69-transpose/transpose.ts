export function transpose(lines: string[]): string[] {
  let maxLen = 0;
  for (const current of lines) {
    if (current.length > maxLen) {
      maxLen = current.length;
    }
  }

  const result: string[] = [];

  for (let col = 0; col < maxLen; col++) {
    const newRowChars: string[] = [];

    let lastCharRowIndex = -1;

    for (let row = 0; row < lines.length; row++) {
      const line = lines[row];
      const char = line[col];

      if (col < line.length) {
        newRowChars.push(char);
        lastCharRowIndex = row;
      } else {
        newRowChars.push(' ');
      }
    }

    if (lastCharRowIndex === -1) {
      result.push('');
    } else {
      result.push(newRowChars.slice(0, lastCharRowIndex + 1).join(''));
    }
  }

  return result;
}
