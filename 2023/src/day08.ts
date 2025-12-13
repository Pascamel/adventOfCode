import { day08input, day08sample1, day08sample3 } from "./data";
import { IDay } from "./helpers";

function greatestCommonDivisor(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function leastCommonMultiple(a: number, b: number): number {
  return (a / greatestCommonDivisor(a, b)) * b;
}

function leastCommonMultipleArray(numbers: number[]): number {
  return numbers.reduce((acc, curr) => leastCommonMultiple(acc, curr));
}

export class Day08 implements IDay<number[]> {
  loadFile(input: string) {
    return {
      directions: input
        .split("\n")[0]
        .split("")
        .map((char) => (char === "R" ? 1 : 0)),
      nodes: input
        .split("\n")
        .slice(2)
        .reduce<Record<string, [string, string]>>((acc, line) => {
          acc[line.split(" = ")[0]] = [
            line.split(" = ")[1].slice(1, 4),
            line.split(" = ")[1].slice(6, 9),
          ];

          return acc;
        }, {}),
    };
  }

  part1(data: { directions: number[]; nodes: Record<string, [string, string]> }) {
    let steps = 0;
    let index = 0;
    let side = 0;
    let current: string = data.nodes["AAA"] ? "AAA" : "11A";

    while (current[2] !== "Z") {
      steps++;
      side = data.directions[index];
      index++;

      if (index >= data.directions.length) {
        index = 0;
      }

      current = data.nodes[current][side];
    }

    return steps;
  }

  part2(data: { directions: number[]; nodes: Record<string, [string, string]> }) {
    let steps = 0;
    let index = 0;
    let side = 0;
    let currents = Object.keys(data.nodes).filter((node) => node[2] === "A");
    const found: (number | null)[] = new Array(currents.length).fill(null).map(() => null);

    while (found.some((indexes) => indexes === null)) {
      steps++;
      side = data.directions[index];
      index++;

      if (index >= data.directions.length) {
        index = 0;
      }

      currents = currents.map((current) => data.nodes[current][side]);

      currents.forEach((currents, i) => {
        if (currents[2] === "Z" && found[i] === null) {
          found[i] = steps;
        }
      });
    }

    return leastCommonMultipleArray(found as number[]);
  }

  solve(input: string) {
    const data = this.loadFile(input);

    const step1 = this.part1(data);
    const step2 = this.part2(data);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day08input);

    console.log(`day 08 step 1: ${step1}`);
    console.log(`day 08 step 2: ${step2}`);
  }
}
