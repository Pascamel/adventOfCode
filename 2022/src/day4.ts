import { IDay } from './helpers';
import { readFileSync } from 'fs';

export class Day4 implements IDay<number[]> {
  solve(fileName: string) {
    const file = readFileSync(fileName, 'utf-8')
      .split('\n')
      .map((v) =>
        v.split(',').map((v) => v.split('-').map((v) => parseInt(v)))
      );

    const contained = (v: number[][]) => {
      const [[start1, end1], [start2, end2]] = v;

      if (start1 >= start2 && end1 <= end2) return true;
      if (start1 <= start2 && end1 >= end2) return true;

      return false;
    };

    const overlaps = (v: number[][]) => {
      const [[start1, end1], [start2, end2]] = v;

      if (start1 <= start2 && start2 <= end1 && end2 > end1) return true;
      if (start2 < start1 && start1 <= end2 && end2 <= end1) return true;

      return false;
    };

    const step1 = file.filter((v) => contained(v)).length;
    const step2 = file.filter((v) => contained(v) || overlaps(v)).length;

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day4.input');

    console.log('day 4 step 1: ' + step1.toString());
    console.log('day 4 step 2: ' + step2.toString());
  }
}
