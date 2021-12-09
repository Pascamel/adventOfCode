import { readFileSync } from 'fs';
import { IDay } from './helpers';

export class Day6 implements IDay {
  days(values: Array<number>, days: number) {
    const counters = new Array(9).fill(0);
    for (let v of values) {
      counters[v]++;
    }

    for (let i = 0; i < days; i++) {
      const dead = counters.shift();
      counters.splice(6, 1, counters[6] + dead);
      counters.splice(8, 1, dead);
    }

    return counters.reduce((acc, v) => acc + v, 0);
  }

  solve(fileName: string) {
    const nums = readFileSync(fileName, 'utf-8')
      .split(',')
      .map((num) => parseInt(num));

    const nums1 = nums.slice();
    const nums2 = nums.slice();

    const result1 = this.days(nums, 80);
    const result2 = this.days(nums, 256);

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve('data/day6.input');

    console.log('day 6 step 1: ' + step1.toString());
    console.log('day 6 step 2: ' + step2.toString());
  }
}
