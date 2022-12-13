import { IDay } from './helpers';
import { readFileSync } from 'fs';

export class Day6 implements IDay {
  solve(fileName: string) {
    const file = readFileSync(fileName, 'utf-8').split('');

    const search = (count: number) => {
      let [result, found] = [-1, false];

      while (!found) {
        result++;
        found = new Set(file.slice(result, result + count)).size === count;
      }

      return result + count;
    };

    const step1 = search(4);
    const step2 = search(14);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day6.input');

    console.log('day 6 step 1: ' + step1.toString());
    console.log('day 6 step 2: ' + step2.toString());
  }
}
