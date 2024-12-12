import { day05input } from './data';
import { IDay } from './helpers';

export class Day05 implements IDay {
  isNice1Condition1 = (s: string) =>
    s.split('').filter((c) => 'aeiou'.indexOf(c) > -1).length >= 3;

  isNice1Condition2 = (s: string) =>
    s.split('').some((c, index) => index > 0 && s.substr(index - 1, 1) === c);

  isNice1Condition3 = (s: string) =>
    s.indexOf('ab') === -1 &&
    s.indexOf('cd') === -1 &&
    s.indexOf('pq') === -1 &&
    s.indexOf('xy') === -1;

  isNice2Condition1 = (s: string) =>
    s
      .split('')
      .some(
        (c, index) =>
          index > 2 &&
          s.indexOf(s.substr(index - 1, 2)) > -1 &&
          s.indexOf(s.substr(index - 1, 2)) < index - 2
      );

  isNice2Condition2 = (s: string) =>
    s.split('').some((c, index) => index > 1 && s.substr(index - 2, 1) === c);

  solve(data: string) {
    const input = data.split('\n');

    const result1 = input
      .filter(this.isNice1Condition1)
      .filter(this.isNice1Condition2)
      .filter(this.isNice1Condition3).length;

    const result2 = input
      .filter(this.isNice2Condition1)
      .filter(this.isNice1Condition2).length;

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve(day05input);

    console.log(`day 05 step 1: ${step1}`);
    console.log(`day 05 step 2: ${step2}`);
  }
}
