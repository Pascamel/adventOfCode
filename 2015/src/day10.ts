import { day10input } from './data';
import { IDay } from './helpers';

export class Day10 implements IDay {
  lookAndSay(input: number[]) {
    let result: number[] = [];
    let count = 1;
    let current = input[0];
    for (let i = 1; i < input.length; i++) {
      if (input[i] === current) {
        count++;
      } else {
        result.push(count);
        result.push(current);
        current = input[i];
        count = 1;
      }
    }
    result.push(count);
    result.push(current);

    return result;
  }

  play(input: number[], times: number) {
    for (let i = 0; i < times; i++) {
      input = this.lookAndSay(input);
    }

    return input.join('');
  }

  solve(input: string) {
    const numbers = input.split('').map((x) => parseInt(x));

    const result1 = this.play(numbers, 40).length;
    const result2 = this.play(numbers, 50).length;

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve(day10input);

    console.log('day 10 step 1: ' + step1.toString());
    console.log('day 10 step 2: ' + step2.toString());
  }
}
