export function isValid(isbn: string): boolean {
  const cleaned: string = isbn.replace(/-/g, '');

  if (cleaned.length !== 10) {
    return false;
  }

  for (let i = 0; i < 10; i++) {
    const char: string = cleaned[i];
    if (i === 9 && char === 'X') {
      continue;
    }
    if (!/[0-9]/.test(char)) {
      return false;
    }
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned[i]) * (10 - i);
  }

  if (cleaned[9] === 'X') {
    sum += 10;
  } else {
    sum += parseInt(cleaned[9]);
  }

  return sum % 11 === 0;
}
