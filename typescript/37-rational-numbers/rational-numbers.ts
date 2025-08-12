export class Rational {
  private numerator: number;
  private denominator: number;

  constructor(numerator: number, denominator: number) {
    this.numerator = numerator;
    this.denominator = denominator;
    this.reduce();
  }

  add(other: Rational): Rational {
    const newNumerator: number = this.numerator * other.denominator + other.numerator * this.denominator;
    const newDenominator: number = this.denominator * other.denominator;
    return new Rational(newNumerator, newDenominator);
  }

  sub(other: Rational): Rational {
    const newNumerator: number = this.numerator * other.denominator - other.numerator * this.denominator;
    const newDenominator: number = this.denominator * other.denominator;
    return new Rational(newNumerator, newDenominator);
  }

  mul(other: Rational): Rational {
    const newNumerator: number = this.numerator * other.numerator;
    const newDenominator: number = this.denominator * other.denominator;
    return new Rational(newNumerator, newDenominator);
  }

  div(other: Rational): Rational {
    const newNumerator: number = this.numerator * other.denominator;
    const newDenominator: number = this.denominator * other.numerator;
    return new Rational(newNumerator, newDenominator);
  }

  abs(): Rational {
    return new Rational(Math.abs(this.numerator), Math.abs(this.denominator));
  }

  exprational(power: number): Rational {
    if (power >= 0) {
      return new Rational(Math.pow(this.numerator, power), Math.pow(this.denominator, power));
    } else {
      const absPower: number = Math.abs(power);
      return new Rational(Math.pow(this.denominator, absPower), Math.pow(this.numerator, absPower));
    }
  }

  expreal(base: number): number {
    return Math.pow(base, this.numerator / this.denominator);
  }

  reduce(): Rational {
    if (this.denominator < 0) {
      this.numerator = -this.numerator;
      this.denominator = -this.denominator;
    }

    const gcd: number = this.gcd(Math.abs(this.numerator), Math.abs(this.denominator));
    this.numerator = this.numerator / gcd;
    this.denominator = this.denominator / gcd;

    return this;
  }

  private gcd(a: number, b: number): number {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }
}
