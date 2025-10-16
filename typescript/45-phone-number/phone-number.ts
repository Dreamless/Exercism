export function clean(input: string): string {
  if (/[a-z]/i.test(input)) {
    throw new Error('Letters not permitted')
  }

  if (/[@:!]/.test(input)) {
    throw new Error('Punctuations not permitted')
  }

  const digits = input.replace(/\D/g, '')

  if (digits.length > 11) {
    throw new Error('More than 11 digits')
  }

  let phone = ''
  if (digits.length === 11) {
    if (digits[0] !== '1') {
      throw new Error('11 digits must start with 1')
    }
    phone = digits.slice(1)
  } else if (digits.length === 10) {
    phone = digits
  } else {
    throw new Error('Incorrect number of digits')
  }

  const area = phone.slice(0, 3)
  const exchange = phone.slice(3, 6)

  if (area[0] === '0') throw new Error('Area code cannot start with zero')
  if (area[0] === '1') throw new Error('Area code cannot start with one')
  if (exchange[0] === '0') throw new Error('Exchange code cannot start with zero')
  if (exchange[0] === '1') throw new Error('Exchange code cannot start with one')

  return phone;
}
