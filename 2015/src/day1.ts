import { readFileSync } from 'fs';
import { IDay } from './helpers';

export class Day1 implements IDay {
  solve(fileName: string) {
    const input = readFileSync(fileName, 'utf-8').split('');

    const result1 = input.reduce(
      (acc, char) => acc + (char === '(' ? 1 : -1),
      0
    );

    let result2 = 0;
    let position = 1;
    let floor = 0;

    for (const char of input) {
      floor += char === '(' ? 1 : -1;
      if (floor === -1) {
        result2 = position;
        break;
      }
      position++;
    }

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve('data/day1.input');

    console.log('day 1 step 1: ' + step1.toString());
    console.log('day 1 step 2: ' + step2.toString());
  }
}
