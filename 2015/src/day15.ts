import { day15input } from './data';
import { IDay } from './helpers';

type Ingredient = [number, number, number, number, number];

export class Day15 implements IDay {
  total(i: Ingredient) {
    return i.slice(0, 4).reduce((acc, v) => acc * Math.max(v, 0), 1);
  }

  part1(p: Ingredient[], w: number) {
    let result = 0;
    let restricted = 0;

    for (let i = 0; i <= w; i++) {
      for (let j = 0; j < w - i; j++) {
        for (let k = 0; k < w - i - j; k++) {
          const l = w - i - j - k;
          const a = p[0][0] * i + p[1][0] * j + p[2][0] * k + p[3][0] * l;
          const b = p[0][1] * i + p[1][1] * j + p[2][1] * k + p[3][1] * l;
          const c = p[0][2] * i + p[1][2] * j + p[2][2] * k + p[3][2] * l;
          const d = p[0][3] * i + p[1][3] * j + p[2][3] * k + p[3][3] * l;
          const e = p[0][4] * i + p[1][4] * j + p[2][4] * k + p[3][4] * l;

          const score =
            Math.max(a, 0) * Math.max(b, 0) * Math.max(c, 0) * Math.max(d, 0);

          if (score > result) {
            result = score;
          }
          if (e === 500 && score > restricted) {
            restricted = score;
          }
        }
      }
    }

    return { result, restricted };
  }

  solve(input: string) {
    const ingredients = input.split('\n').map((line) =>
      line
        .match(
          /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/
        )
        ?.slice(2)
        .map(Number)
    ) as Ingredient[];

    const { result, restricted } = this.part1(ingredients, 100);
    let result1 = result;
    let result2 = restricted;

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve(day15input);

    console.log(`day 15 step 1: ${step1}`);
    console.log(`day 15 step 2: ${step2}`);
  }
}
