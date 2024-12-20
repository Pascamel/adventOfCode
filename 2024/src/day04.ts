import { day04sample } from './data';
import { IDay } from './helpers';

export class Day04 implements IDay<number[]> {
  file: string[][] = [[]];

  get(row: number, col: number) {
    try {
      return this.file[row][col];
    } catch {
      return '.';
    }
  }

  getWord(
    row: number,
    col: number,
    rowIncrement: number,
    colIncrement: number,
    length: number
  ) {
    let result = '';

    for (let i = 0; i < length; i++) {
      result += this.get(row + rowIncrement * i, col + colIncrement * i);
    }

    return result;
  }

  getCross(row: number, col: number) {
    return (
      this.getWord(row - 1, col - 1, 1, 1, 3) +
      this.getWord(row - 1, col + 1, 1, -1, 3)
    );
  }

  solve(input: string) {
    this.file = input.split('\n').map((line) => line.split(''));

    const step1 = this.file.reduce(
      (accRow, v, row) =>
        accRow +
        v.reduce(
          (acc, _v, col) =>
            acc +
            (this.getWord(row, col, 0, 1, 4) === 'XMAS' ? 1 : 0) +
            (this.getWord(row, col, 0, -1, 4) === 'XMAS' ? 1 : 0) +
            (this.getWord(row, col, 1, 0, 4) === 'XMAS' ? 1 : 0) +
            (this.getWord(row, col, -1, 0, 4) === 'XMAS' ? 1 : 0) +
            (this.getWord(row, col, 1, 1, 4) === 'XMAS' ? 1 : 0) +
            (this.getWord(row, col, 1, -1, 4) === 'XMAS' ? 1 : 0) +
            (this.getWord(row, col, -1, 1, 4) === 'XMAS' ? 1 : 0) +
            (this.getWord(row, col, -1, -1, 4) === 'XMAS' ? 1 : 0),
          0
        ),
      0
    );

    const step2 = this.file.reduce(
      (accRow, v, row) =>
        accRow +
        v.reduce(
          (acc, _v, col) =>
            acc +
            (this.getCross(row, col) === 'MASMAS' ? 1 : 0) +
            (this.getCross(row, col) === 'SAMSAM' ? 1 : 0) +
            (this.getCross(row, col) === 'MASSAM' ? 1 : 0) +
            (this.getCross(row, col) === 'SAMMAS' ? 1 : 0),
          0
        ),
      0
    );

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day04sample);

    console.log(`day 04 step 1: ${step1}`);
    console.log(`day 04 step 2: ${step2}`);
  }
}
