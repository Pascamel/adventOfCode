import { day03input } from './data';
import { IDay, Sum } from './helpers';

export class Day03 implements IDay<number[]> {
  solve(input: string) {
    const step1 = Sum(
      input
        .match(/mul\([0-9]+,[0-9]+\)/g)!
        .map((s) => s.match(/[0-9]+/g)!.map((v) => parseInt(v)))
        .map((v) => (v ? v[0] * v[1] : 0))
    );

    const data2 = input
      .match(/(mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\))/g)!
      .reduce(
        (acc, v, i) =>
          v === 'do()'
            ? { array: acc.array, include: true }
            : v === "don't()"
            ? { array: acc.array, include: false }
            : acc.include
            ? { array: [...acc.array, v], include: true }
            : acc,
        { array: [] as string[], include: true }
      );

    const step2 = Sum(
      data2.array
        .map((s) => s.match(/[0-9]+/g)!.map((v) => parseInt(v)))
        .map((v) => (v ? v[0] * v[1] : 0))
    );

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day03input);

    console.log(`day 03 step 1: ${step1}`);
    console.log(`day 03 step 2: ${step2}`);
  }
}
