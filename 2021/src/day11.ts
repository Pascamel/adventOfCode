import { readFileSync } from 'fs';
import { IDay } from './helpers';

const SIZE = 10;

export class Day11 implements IDay {
  flash(input: Array<Array<number>>) {
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        input[row][col] = input[row][col] + 1;
      }
    }

    const nines: Array<Array<number>> = [];
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (input[row][col] > 9) {
          nines.push([row, col]);
        }
      }
    }

    const flashed: Array<Array<number>> = [...nines];
    while (nines.length > 0) {
      const nine = nines.shift();
      if (!nine) {
        continue;
      }

      let [row, col] = nine;
      for (let r = Math.max(row - 1, 0); r < Math.min(row + 2, SIZE); r++) {
        for (let c = Math.max(col - 1, 0); c < Math.min(col + 2, SIZE); c++) {
          if (r === row && c === col) continue;

          if (!flashed.find((f) => f[0] === r && f[1] === c)) {
            input[r][c] = input[r][c] + 1;

            if (input[r][c] > 9) {
              flashed.push([r, c]);
              nines.push([r, c]);
            }
          }
        }
      }
    }

    return input;
  }

  countAndResetNines(input: Array<Array<number>>) {
    let counter = 0;
    for (let row = 0; row < SIZE; row++) {
      for (let col = 0; col < SIZE; col++) {
        if (input[row][col] > 9) {
          counter++;
          input[row][col] = 0;
        }
      }
    }
    return { counter, input };
  }

  part1(input: Array<Array<number>>) {
    let result = 0;

    for (let time = 0; time < 100; time++) {
      input = this.flash(input);
      const { counter, input: newInput } = this.countAndResetNines(input);
      result += counter;
      input = newInput;
    }

    return result;
  }

  part2(input: Array<Array<number>>) {
    let time = 0;

    while (true) {
      time++;

      input = this.flash(input);
      const { counter, input: newInput } = this.countAndResetNines(input);
      input = newInput;

      if (counter === SIZE * SIZE) {
        return time;
      }
    }
  }

  solve(fileName: string) {
    const input = readFileSync(fileName, 'utf-8').split('\n');
    const input1 = input.map((line) => line.split('').map((n) => parseInt(n)));
    const input2 = input.map((line) => line.split('').map((n) => parseInt(n)));

    let result1 = this.part1(input1);
    let result2 = this.part2(input2);

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve('data/day11.input');

    console.log('day 11 step 1: ' + step1.toString());
    console.log('day 11 step 2: ' + step2.toString());
  }
}
