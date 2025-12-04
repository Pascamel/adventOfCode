import { day02input } from "./data";
import { IDay, MathMax, Sum } from "./helpers";

type Color = "r" | "g" | "b";

type IDraw = {
  [key in Color]?: number;
};

interface IGame {
  id: number;
  draws: IDraw[];
}

export class Day02 implements IDay<number[]> {
  solve(input: string) {
    const file: IGame[] = input.split("\n").map((line) => {
      const [id, leftover1] = line.replace("Game ", "").split(": ");
      const draws: IDraw[] = leftover1.split("; ").map((d) => {
        const detail = d.split(", ");
        const draw: IDraw = detail.reduce((acc, v) => {
          const [n, color] = v.split(" ");
          const col: Color = color[0] as Color;

          return {
            ...acc,
            [col]: parseInt(n),
          };
        }, {});

        return draw;
      });

      return { id: parseInt(id), draws };
    });

    const step1 = file
      .filter(
        ({ draws }) => !draws.some(({ r, g, b }) => (r ?? 0) > 12 || (g ?? 0) > 13 || (b ?? 0) > 14)
      )
      .map(({ id }) => id)
      .reduce(Sum);

    const step2 = file
      .map(
        ({ draws }) =>
          draws.map(({ r }) => r ?? 0).reduce(MathMax) *
          draws.map(({ g }) => g ?? 0).reduce(MathMax) *
          draws.map(({ b }) => b ?? 0).reduce(MathMax)
      )
      .reduce((acc, v) => acc + v);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day02input);

    console.log(`day 02 step 1: ${step1}`);
    console.log(`day 02 step 2: ${step2}`);
  }
}
