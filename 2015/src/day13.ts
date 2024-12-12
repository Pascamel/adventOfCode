import { day13input } from './data';
import { IDay } from './helpers';

export class Day13 implements IDay {
  getAllPermutations(size: number) {
    const worker = (values: number[]): number[][] => {
      if (values.length === 0) return [[]];

      const result: number[][] = [];

      for (let i = 0; i < values.length; i++) {
        const current = values[i];
        const remaining = values.slice(0, i).concat(values.slice(i + 1));

        const subPermutations = worker(remaining);
        for (const perm of subPermutations) {
          result.push([current, ...perm]);
        }
      }

      return result;
    };

    return worker(new Array(size).fill(0).map((_, i) => i));
  }

  getScoresTable(input: string, includeMyself: boolean) {
    const names: string[] = [];

    const scores = input.split('\n').reduce((acc, line) => {
      const name1 = line.split(' ')[0];
      const name2 = line.split(' ').pop()!.slice(0, -1);

      const score =
        parseInt(line.split(' ')[3]) * (line.split(' ')[2] === 'gain' ? 1 : -1);

      let index1 = names.indexOf(name1);
      if (index1 === -1) {
        names.push(name1);
        index1 = names.length - 1;
      }

      let index2 = names.indexOf(name2);
      if (index2 === -1) {
        names.push(name2);
        index2 = names.length - 1;
      }
      acc[index1] = acc[index1] || Array(names.length).fill(0);
      acc[index1][index2] = score;

      return acc;
    }, [] as number[][]);

    if (includeMyself) {
      scores.forEach((score) => score.push(0));
      scores.push(new Array(names.length).fill(0));
    }

    return scores;
  }

  getTableScore(table: number[], scores: number[][]) {
    return table.reduce((acc, person, i) => {
      const next = (i + 1) % table.length;
      return acc + scores[person][table[next]] + scores[table[next]][person];
    }, 0);
  }

  bestTable(input: string, includeMyself: boolean) {
    const scores = this.getScoresTable(input, includeMyself);
    const perms = this.getAllPermutations(scores.length);

    return perms.reduce(
      (acc, perm) => Math.max(acc, this.getTableScore(perm, scores)),
      Number.MIN_SAFE_INTEGER
    );
  }

  solve(input: string) {
    const result1 = this.bestTable(input, false);
    const result2 = this.bestTable(input, true);

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve(day13input);

    console.log(`day 13 step 1: ${step1}`);
    console.log(`day 13 step 2: ${step2}`);
  }
}
