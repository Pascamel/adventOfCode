import md5 from 'md5';
import { day04input } from './data';
import { IDay } from './helpers';

export class Day04 implements IDay {
  solve(input: string) {
    let i = 0;
    let result1 = 0;
    let result2 = 0;

    while (result1 === 0) {
      const hash = md5(input + i);
      if (hash.startsWith('00000')) {
        result1 = i;
      }
      i++;
    }

    while (result2 === 0) {
      const hash = md5(input + i);
      if (hash.startsWith('000000')) {
        result2 = i;
      }
      i++;
    }

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve(day04input);

    console.log('day 04 step 1: ' + step1.toString());
    console.log('day 04 step 2: ' + step2.toString());
  }
}
