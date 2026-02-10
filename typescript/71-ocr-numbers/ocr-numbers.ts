const DIGITS: Record<string, string> = {
  " _ | ||_|   ": "0",
  "     |  |   ": "1",
  " _  _||_    ": "2",
  " _  _| _|   ": "3",
  "   |_|  |   ": "4",
  " _ |_  _|   ": "5",
  " _ |_ |_|   ": "6",
  " _   |  |   ": "7",
  " _ |_||_|   ": "8",
  " _ |_| _|   ": "9",
};

function parseLine(lines: string[]): string {
  const width = lines[0].length;
  let result = "";

  for (let col = 0; col < width; col += 3) {
    const digitBlock: string[] = lines.map(line => line.slice(col, col + 3));
    const key = digitBlock.join("");
    result += DIGITS[key] ?? "?";
  }

  return result;
}

export function convert(input: string): string {
  const lines: string[] = input.split("\n");
  const results: string[] = [];

  for (let row = 0; row < lines.length; row += 4) {
    const block: string[] = lines.slice(row, row + 4);
    results.push(parseLine(block));
  }

  return results.join(",");
}
