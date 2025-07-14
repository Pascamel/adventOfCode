import { day18input } from './data';
import { IDay } from './helpers';

export class Day18 implements IDay {
  next(input: boolean[][], forceCorners = false) {
    const result: boolean[][] = [...input.map((_) => [])];
    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < input[row].length; col++) {
        const neighbors =
          (input[row - 1]?.[col - 1] ? 1 : 0) +
          (input[row - 1]?.[col] ? 1 : 0) +
          (input[row - 1]?.[col + 1] ? 1 : 0) +
          (input[row]?.[col - 1] ? 1 : 0) +
          (input[row]?.[col + 1] ? 1 : 0) +
          (input[row + 1]?.[col - 1] ? 1 : 0) +
          (input[row + 1]?.[col] ? 1 : 0) +
          (input[row + 1]?.[col + 1] ? 1 : 0) +
          0;

        if (
          forceCorners &&
          ((row === 0 && col === 0) ||
            (row === 0 && col === input[row].length - 1) ||
            (row === input.length - 1 && col === 0) ||
            (row === input.length - 1 && col === input[row].length - 1))
        ) {
          result[row][col] = true;
        } else {
          result[row][col] = input[row][col]
            ? neighbors === 2 || neighbors === 3
            : neighbors === 3;
        }
      }
    }

    return result;
  }

  count(input: boolean[][]) {
    let count = 0;
    for (const row of input) {
      for (const cell of row) {
        count += cell ? 1 : 0;
      }
    }
    return count;
  }

  solve(input: string) {
    let tmp1 = input
      .split('\n')
      .map((line) => line.split('').map((c) => c === '#'));

    for (let i = 0; i < 100; i++) {
      tmp1 = this.next(tmp1);
    }

    let tmp2 = input
      .split('\n')
      .map((line) => line.split('').map((c) => c === '#'));

    tmp2[0][0] = true;
    tmp2[0][tmp2[0].length - 1] = true;
    tmp2[tmp2.length - 1][0] = true;
    tmp2[tmp2.length - 1][tmp2[0].length - 1] = true;

    for (let i = 0; i < 100; i++) {
      tmp2 = this.next(tmp2, true);
    }

    return [this.count(tmp1), this.count(tmp2)];
  }

  run() {
    const [step1, step2] = this.solve(day18input);

    console.log(`day 18 step 1: ${step1}`);
    console.log(`day 18 step 2: ${step2}`);
  }
}
