export function sayInEnglish(n: number): string {
  if (n === 0) return 'zero'

  if (!Number.isInteger(n) || n < 0 || n > 999_999_999_999) {
    throw new Error('Number must be between 0 and 999,999,999,999.')
  }

  const ones: string[] = [
    '', 'one', 'two', 'three', 'four', 'five', 'six',
    'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
    'thirteen', 'fourteen', 'fifteen', 'sixteen',
    'seventeen', 'eighteen', 'nineteen'
  ]

  const tens: string[] = [
    '', '', 'twenty', 'thirty', 'forty', 'fifty',
    'sixty', 'seventy', 'eighty', 'ninety'
  ]

  const scales: string[] = ['', 'thousand', 'million', 'billion']

  const wordParts = (num: number): string => {
    const parts: string[] = []

    if (num >= 100) {
      parts.push(`${ones[Math.floor(num / 100)]} hundred`)
      num %= 100
    }

    if (num >= 20) {
      const t = Math.floor(num / 10)
      const o = num % 10
      parts.push(o ? `${tens[t]}-${ones[o]}` : tens[t])
    } else if (num > 0) {
      parts.push(ones[num])
    }

    return parts.join(' ')
  }

  const chunks: number[] = []
  let rest = n
  while (rest > 0) {
    chunks.push(rest % 1000)
    rest = Math.floor(rest / 1000)
  }

  const words: string[] = []

  for (let i = chunks.length - 1; i >= 0; i--) {
    const chunk = chunks[i]
    if (chunk > 0) {
      const scale = scales[i]
      words.push(`${wordParts(chunk)}${scale ? ' ' + scale : ''}`)
    }
  }

  return words.join(' ').replace(/\s+/g, ' ').trim()
}
