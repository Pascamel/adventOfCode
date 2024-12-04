import { readFileSync } from 'fs';
import { IDay, Sum } from './helpers';

export class Day1 implements IDay<number[]> {
  solve(fileName: string) {
    const lines = readFileSync(fileName, 'utf-8').split('\n');

    const [one, two] = lines.reduce(
      (acc, line) => {
        const [a, b] = line.split('   ').map((x) => parseInt(x));
        return [
          [...acc[0], a],
          [...acc[1], b],
        ];
      },
      [[], []] as [number[], number[]]
    );

    one.sort((a, b) => a - b);
    two.sort((a, b) => a - b);

    const step1 = Sum(
      one.reduce((acc, a, i) => [...acc, Math.abs(a - two[i])], [] as number[])
    );

    const mapOne = one.reduce(
      (acc, a, i) => acc.set(a, (acc.get(a) ?? 0) + 1),
      new Map<number, number>()
    );
    const mapTwo = two.reduce(
      (acc, a, i) => acc.set(a, (acc.get(a) ?? 0) + 1),
      new Map<number, number>()
    );

    const step2 = Sum(
      [...mapOne.keys()].map(
        (k) => k * (mapOne.get(k) ?? 0) * (mapTwo.get(k) ?? 0)
      )
    );

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day1.input');

    console.log(`day 1 step 1: ${step1}`);
    console.log(`day 1 step 2: ${step2}`);
  }
}
