export class Anagram {
  private readonly target: string;
  private readonly sortedTarget: string;

  constructor(input: string) {
    this.target = input.toLowerCase();
    this.sortedTarget = this.sortStr(this.target);
  }

  private sortStr(str: string): string {
    return str.split('').sort().join('');
  }

  public matches(...potentials: string[]): string[] {
    const arr: string[] = [];

    for (const str of potentials) {
      if (
        this.sortStr(str.toLowerCase()) === this.sortedTarget &&
        str.toLowerCase() !== this.target
      ) {
        arr.push(str);
      }
    }

    return arr;
  }
}
