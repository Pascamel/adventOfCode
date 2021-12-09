import { readFileSync } from 'fs';
import { IDay } from './helpers';

export class Day7 implements IDay {
  cost2: Array<number>;

  constructor() {
    this.cost2 = [0];
    for (let i = 0; i < 2000; i++) {
      let v = [...this.cost2].pop() || 0;
      this.cost2.push(v + this.cost2.length);
    }
  }

  median(arr: Array<number>) {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  }

  average(arr: Array<number>) {
    return Math.floor(arr.reduce((acc, v) => acc + v, 0) / arr.length);
  }

  gasToTarget1(arr: Array<number>, target: number) {
    return arr.reduce((acc, v) => acc + Math.abs(v - target), 0);
  }

  gasToTarget2(arr: Array<number>, target: number) {
    return arr.reduce((acc, v) => acc + this.cost2[Math.abs(v - target)], 0);
  }

  solve(fileName: string) {
    const nums = readFileSync(fileName, 'utf-8')
      .split(',')
      .map((num) => parseInt(num));

    const result1 = this.gasToTarget1(nums, this.median(nums));
    const result2 = this.gasToTarget2(nums, this.average(nums));

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve('data/day7.input');

    console.log('day 7 step 1: ' + step1.toString());
    console.log('day 7 step 2: ' + step2.toString());
  }
}
