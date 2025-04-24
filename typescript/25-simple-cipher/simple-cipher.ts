export class SimpleCipher {
  public key: string;
  private static alphabet = 'abcdefghijklmnopqrstuvwxyz';

  constructor(key?: string) {
    this.key = key || SimpleCipher.generateRandomKey();
  }

  static generateRandomKey(length = 100): string {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += this.alphabet.charAt(Math.floor(Math.random() * this.alphabet.length));
    }
    return result;
  }

  private shift(char: string, shift: number): string {
    const charIndex = SimpleCipher.alphabet.indexOf(char);
    const alphabetLength: number = SimpleCipher.alphabet.length;
    const newIndex = (charIndex + shift + alphabetLength) % alphabetLength;
    return SimpleCipher.alphabet[newIndex];
  }

  private transformText(text: string, shiftDirection: number): string {
    return text
      .split('')
      .map((char, i) => {
        const keyChar = this.key[i % this.key.length];
        const shift = SimpleCipher.alphabet.indexOf(keyChar) * shiftDirection;
        return this.shift(char, shift);
      })
      .join('');
  }

  encode(text: string): string {
    return this.transformText(text, 1)
  }

  decode(cipher: string): string {
    return this.transformText(cipher, -1);
  }
}
