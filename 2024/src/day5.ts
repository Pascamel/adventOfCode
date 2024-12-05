import { readFileSync } from 'fs';
import { IDay, Middle, Sum } from './helpers';

export class Day5 implements IDay<number[]> {
  rules: [number, number][] = [];
  updates: number[][] = [];

  solve(fileName: string) {
    const file = readFileSync(fileName, 'utf-8').split('\n') as string[];

    this.rules = file
      .slice(0, file.indexOf(''))
      .map((line) => line.split('|').map(Number) as [number, number]);

    this.updates = file
      .slice(file.indexOf('') + 1)
      .map((line) => line.split(',').map(Number));

    const matchRule = (rule: [number, number], update: number[]) => {
      return (
        !update.includes(rule[0]) ||
        !update.includes(rule[1]) ||
        update.indexOf(rule[0]) < update.indexOf(rule[1])
      );
    };

    const validUpdatesStep1 = this.updates.reduce(
      (acc, update) => [
        ...acc,
        ...(this.rules.every((rule) => matchRule(rule, update))
          ? [update]
          : []),
      ],
      [] as number[][]
    );

    const step1 = Sum(validUpdatesStep1.map(Middle));

    const invalidUpdatesStep2 = this.updates.reduce(
      (acc, update) => [
        ...acc,
        ...(this.rules.some((rule) => !matchRule(rule, update))
          ? [update]
          : []),
      ],
      [] as number[][]
    );

    invalidUpdatesStep2.forEach((update) => {
      update.sort((a, b) => {
        const rule = this.rules.find((rule) => rule[0] === a && rule[1] === b);
        if (!rule) {
          return 0;
        }
        if (update.indexOf(a) < update.indexOf(b)) {
          return matchRule(rule, [a, b]) ? 1 : -1;
        }
        return matchRule(rule, [b, a]) ? 1 : -1;
      });
    });

    const step2 = Sum(invalidUpdatesStep2.map(Middle));

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day5.input');

    console.log(`day 5 step 1: ${step1}`);
    console.log(`day 5 step 2: ${step2}`);
  }
}
