import { IDay } from "./helpers";
import { day10input } from "./data";

export class Day10 implements IDay {
  pairs: Map<string, string>;
  openers: Array<string>;
  pointsPart1: Map<string, number>;
  pointsPart2: Map<string, number>;

  constructor() {
    this.pairs = new Map([
      ["[", "]"],
      ["{", "}"],
      ["(", ")"],
      ["<", ">"],
    ]);
    this.openers = Array.from(this.pairs.keys());
    this.pointsPart1 = new Map([
      [")", 3],
      ["]", 57],
      ["}", 1197],
      [">", 25137],
    ]);
    this.pointsPart2 = new Map([
      [")", 1],
      ["]", 2],
      ["}", 3],
      [">", 4],
    ]);
  }

  part1(input: Array<string>) {
    return input
      .map((line) => {
        let expected: Array<string> = [];
        for (let char of line.split("")) {
          if (this.openers.indexOf(char) > -1) {
            expected = [this.pairs.get(char) ?? "", ...expected];
          } else {
            const popped = expected.shift();
            if (char !== popped) {
              return char;
            }
          }
        }
        return "";
      })
      .filter((invalidChar) => invalidChar.length > 0)
      .reduce((acc, v) => acc + (this.pointsPart1.get(v) ?? 0), 0);
  }

  part2(input: Array<string>) {
    const tmp = input
      .map((line) => {
        let expected: Array<string> = [];
        for (let char of line.split("")) {
          if (this.openers.indexOf(char) > -1) {
            expected = [this.pairs.get(char) ?? "", ...expected];
          } else {
            const popped = expected.shift();
            if (char !== popped) {
              return [];
            }
          }
        }
        return expected;
      })
      .filter((result) => result.length > 0)
      .map((chars) =>
        chars.reduce((acc, v) => acc * 5 + (this.pointsPart2.get(v) ?? 0), 0)
      )
      .sort((a, b) => a - b);

    return tmp[(tmp.length - 1) / 2];
  }

  solve(input_: string) {
    const input = input_.split("\n");

    let result1 = this.part1(input);
    let result2 = this.part2(input);

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve(day10input);

    console.log("day 10 step 1: " + step1.toString());
    console.log("day 10 step 2: " + step2.toString());
  }
}
