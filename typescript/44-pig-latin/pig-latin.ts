export function translate(phrase: string): string {
  const words: string[] = phrase.split(' ');

  const translateWord = (word: string): string => {
    const letters: string[] = ['a', 'e', 'i', 'o', 'u'];

    if (letters.includes(word[0]) || word.startsWith('xr') || word.startsWith('yt')) {
      return word + 'ay';
    }

    let firstSoundIndex = -1;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (letters.includes(char) || (char === 'y' && i > 0)) {
        firstSoundIndex = i;
        break;
      }
    }

    if (firstSoundIndex > -1) {
      const prefix = word.substring(0, firstSoundIndex);
      const rest = word.substring(firstSoundIndex);
      return `${rest}${prefix}ay`;
    }

    return word + 'ay';
  };

  return words.map(translateWord).join(' ');
}
