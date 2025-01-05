export class Robot {
  private static allNames: string[] = Robot.generateAllNames();
  private static nextNameIndex = 0;
  private _name: string | null = null;

  private static generateAllNames(): string[] {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const allNames: string[] = [];

    for (const firstLetter of letters) {
      for (const secondLetter of letters) {
        for (let numIndex = 0; numIndex < 1000; numIndex++) {
          allNames.push(`${firstLetter}${secondLetter}${numIndex.toString().padStart(3, '0')}`);
        }
      }
    }

    shuffle(allNames)

    return allNames;
  }

  public get name(): string {
    if (!this._name) {
      if (Robot.nextNameIndex >= Robot.allNames.length) {
        throw new Error('Index out of bounds');
      }

      this._name = Robot.allNames[Robot.nextNameIndex];
      Robot.nextNameIndex++;
    }

    return this._name;
  }

  public resetName(): void {
    if (this._name) {
      this._name = null;
    }
  }

  public static releaseNames(): void {
    Robot.nextNameIndex = 0;
  }
}

function shuffle<T>(arr: T[]): void {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.floor(Math.random() * (arr.length - i)) + i;
    swap(arr, i, randomIndex);
  }
}

function swap<T>(arr: T[], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
