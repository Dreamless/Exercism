const isPrime = (num: number): boolean => {
  if (!Number.isInteger(num)) return false;
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
};

export class DiffieHellman {
  private readonly p: number;
  private readonly g: number;

  constructor(p: unknown, g: unknown) {
    if (typeof p !== 'number' || typeof g !== 'number')
      throw new Error('p and g must be numbers');

    if (p <= 1 || g <= 0) {
      throw new Error('Invalid params');
    }

    if (!isPrime(p)) {
      throw new Error('p must be a prime number');
    }

    this.p = p;
    this.g = g;
  }

  public getPublicKey(privateKey: unknown): number {
    if (typeof privateKey !== 'number') {
      throw new Error('Keys must be numbers');
    }

    if (privateKey <= 1 || privateKey >= this.p) {
      throw new Error('Private key must be > 1');
    }

    return this.modPow(this.g, privateKey, this.p);
  }

  public getSecret(theirPublicKey: unknown, myPrivateKey: unknown): number {
    if (typeof theirPublicKey !== 'number' || typeof myPrivateKey !== 'number') {
      throw new Error('Keys must be numbers');
    }

    return this.modPow(theirPublicKey, myPrivateKey, this.p);
  }

  private modPow(base: number, exponent: number, modulus: number): number {
    let result = 1;
    base = base % modulus;

    while (exponent > 0) {
      if (exponent % 2 === 1) {
        result = (result * base) % modulus;
      }
      exponent = Math.floor(exponent / 2);
      base = (base * base) % modulus;
    }

    return result;
  }
}
