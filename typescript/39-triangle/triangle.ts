export class Triangle {
  private readonly isTriangle: boolean;
  constructor(private readonly a: number, private readonly b: number, private readonly c: number) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.isTriangle = a + b > c && b + c > a && a + c > b;
  }

  get isEquilateral(): boolean {
    return this.isTriangle && this.a === this.b && this.b === this.c;
  }

  get isIsosceles(): boolean {
    return this.isTriangle &&
           (this.a === this.b ||
           this.b === this.c ||
           this.a === this.c);
  }

  get isScalene(): boolean {
    return this.isTriangle &&
           this.a !== this.b &&
           this.b !== this.c &&
           this.a !== this.c;
  }
}
