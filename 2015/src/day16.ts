import { parse } from 'path';
import { day12input, day16input } from './data';
import { IDay } from './helpers';


export class Day16 implements IDay {
  sue = new Map<string, number>([
    ['children', 3],
    ['cats', 7],
    ['samoyeds', 2],
    ['pomeranians', 3],
    ['akitas', 0],
    ['vizslas', 0],
    ['goldfish', 5],
    ['trees', 3],
    ['cars', 2],
    ['perfumes', 1],
  ]);
  match1(key: string, value:number) {
    return this.sue.get(key) === value
  }

  match2(key: string, value:number) {
    if (key === 'cats' || key === 'trees') {
      return this.sue.get(key)! < value;
    } else if (key === 'pomeranians' || key === 'goldfish') {
      return this.sue.get(key)! > value;
    } else {
      return this.sue.get(key) === value;
    }
  }

  solve(input: string) {
    let result1 = -1;
    let result2 = -1;

    input.split('\n').forEach((line) => {
      const test = line.match(/Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/)!;
      
      if ([2, 4, 6].reduce((acc, i) => acc && this.match1(test[i], parseInt(test[i+1])), true)) {
        result1 = parseInt(test[1]);
      }

      if ([2, 4, 6].reduce((acc, i) => acc && this.match2(test[i], parseInt(test[i+1])), true)) {
        result2 = parseInt(test[1]);
      }
    });

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve(day16input);

    console.log(`day 16 step 1: ${step1}`);
    console.log(`day 16 step 2: ${step2}`);
  }
}
