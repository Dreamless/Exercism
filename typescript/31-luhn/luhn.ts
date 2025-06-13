export function valid(digitString: string): boolean {
  const sanitized = digitString.replace(/\s/g, '');
  let sum = 0;

  if (sanitized.length <= 1 || /[^0-9]/.test(sanitized)) return false;

  for (let i = 0; i < sanitized.length; i++) {
    let digit = parseInt(sanitized[sanitized.length - 1 - i], 10);

    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
  }

  return sum % 10 === 0;
}
