export function translate(phrase: string): string {
  const vowelRegex = /^[aeiou]|xr|yt/;
  const replaceRegex = /^([^aeiou]*qu|[^aeiouy]+|y)(.*)/;
  return phrase
    .split(' ')
    .map((word: string): string => {
      if (vowelRegex.test(word)) {
        return word + 'ay';
      }

      return word.replace(replaceRegex, '$2$1ay');
    })
    .join(' ');
}
