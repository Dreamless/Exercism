export class Robot {
  private static usedNames: Set<string> = new Set();
  private _name: string | null = null;
  private static serialNumber = 0;

  constructor() {}

  private static generateUniqueName(): string {
    let name: string;
    const generateRandomName = (qty: number): string => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let str = "";
      while (str.length < qty) {
        str += letters[Math.floor(Math.random() * letters.length)];
      }
      return str;
    }

    const generateSerialNumber = this.serialNumber < 99 ?
      `00${this.serialNumber}` :
      this.serialNumber.toString();

    do {
      name = generateRandomName(2) + generateSerialNumber;
    } while (this.usedNames.has(name));

    this.usedNames.add(name);
    this.serialNumber++;
    return name;
  }

  public get name(): string {
    if (!this._name) {
      this._name = Robot.generateUniqueName();
    }
    return this._name;
  }

  public resetName(): void {
    this._name = null;
  }

  public static releaseNames(): void {
    this.usedNames.clear();
  }
}
