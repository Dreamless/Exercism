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
      const lowCaseStr = str.toLowerCase();
      if (
        this.sortStr(lowCaseStr) === this.sortedTarget &&
        lowCaseStr !== this.target
      ) {
        arr.push(str);
      }
    }

    return arr;
  }
}
