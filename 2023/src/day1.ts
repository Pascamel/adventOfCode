import { IDay, Sum } from './helpers';
import { readFileSync } from 'fs';

const DIGITS = 'zero,one,two,three,four,five,six,seven,eight,nine'.split(',');

export class Day1 implements IDay<number[]> {
  solve(fileName: string) {
    const nums = readFileSync(fileName, 'utf-8').split('\n');

    const step1 = nums
      .map((l) => l.split('').filter((c) => !isNaN(parseInt(c))))
      .map((l) => parseInt(`${l[0]}${l.pop()?.[0]}`, 10))
      .reduce(Sum);

    const pattern = (s: string, i: number) => `${s[0]}${i}${s.substring(1)}`;

    const step2 = nums
      .map((l) => DIGITS.reduce((s, d, i) => s.replaceAll(d, pattern(d, i)), l))
      .map((l) => l.split('').filter((c) => !isNaN(parseInt(c))))
      .map((l) => parseInt(`${l[0]}${l.pop()?.[0]}`))
      .reduce(Sum);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day1.input');

    console.log(`day 1 step 1: ${step1}`);
    console.log(`day 1 step 2: ${step2}`);
  }
}
