import { IDay } from './helpers';
import { readFileSync } from 'fs';

export class Day3 implements IDay<number[]> {
  solve(fileName: string) {
    const file = readFileSync(fileName, 'utf-8').split('\n');
    const step1 = file
      .map((s) => {
        const p1 = s.slice(0, s.length / 2).split('');
        const p2 = s.slice(s.length / 2, s.length).split('');
        const wrongItem = p1.filter((v) => p2.includes(v)).pop() ?? '';
        const asciiCode = wrongItem.charCodeAt(0);

        // 'a'.charCodeAt(0) = 97 and 'A'.charCodeAt(0)-38 = 27
        return asciiCode - (asciiCode < 91 ? 38 : 96);
      })
      .reduce((a, b) => a + b, 0);

    const step2_1 = file
      .reduce(
        (acc, v) => {
          if (acc[acc.length - 1].length < 3) {
            acc[acc.length - 1].push(v);
          } else {
            acc.push([v]);
          }
          return acc;
        },
        [[]] as string[][]
      )
      .map((triplet) => {
        const [b1, b2, b3] = triplet.map((v) => v.split(''));
        const wrongItem =
          b1.filter((v) => b2.includes(v) && b3.includes(v)).pop() ?? '';
        const asciiCode = wrongItem.charCodeAt(0);

        return asciiCode - (asciiCode < 91 ? 38 : 96);
      });

    const step2 = step2_1.reduce((a, b) => a + b, 0);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day3.input');

    console.log(`day 3 step 1: ${step1}`);
    console.log(`day 3 step 2: ${step2}`);
  }
}
