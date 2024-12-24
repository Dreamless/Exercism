export class Matrix {
  readonly matrix: number[][];

  constructor(input: string) {
    this.matrix = input.split(/\n/).map(row =>
      row.split(/\s+/).map(n => Number(n))
    );
  }

  get rows(): number[][] {
    return this.matrix;
  }

  get columns(): number[][] {
    return this.matrix.map((_, colIndex) => this.matrix.map(currentRow => {
      return currentRow[colIndex];
    }));
  }
}
