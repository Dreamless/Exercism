export class ValueError extends Error {
  constructor() {
    super('Bank account error')
  }
}

export class BankAccount {
  private _balance = 0
  private _open = false

  open(): void {
    if (this._open) {
      throw new ValueError()
    }
    this._balance = 0
    this._open = true
  }

  close(): void {
    this.ensureOpen()
    this._open = false
    this._balance = 0
  }

  deposit(amount: number): void {
    this.ensureOpen()
    if (amount < 0) {
      throw new ValueError()
    }
    this._balance += amount
  }

  withdraw(amount: number): void {
    this.ensureOpen()
    if (amount < 0 || amount > this._balance) {
      throw new ValueError()
    }
    this._balance -= amount
  }

  get balance(): number {
    this.ensureOpen()
    return this._balance
  }

  private ensureOpen(): void {
    if (!this._open) {
      throw new ValueError()
    }
  }
}
