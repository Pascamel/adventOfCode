import { IDay } from "./helpers";
import { day08input } from "./data";

export class Day08 implements IDay {
  part1(input: Array<string>) {
    return input.reduce((acc, line) => {
      const result = line
        .split(" | ")[1]
        .split(" ")
        .map((v) => new Set(v.split("")).size)
        .filter((v) => [2, 3, 4, 7].indexOf(v) > -1);
      return acc + result.length;
    }, 0);
  }

  part2(input: Array<string>) {
    const count = (s1: string, s2: string) => {
      return s1.split("").filter((v) => s2.split("").includes(v)).length;
    };

    const lines = input.map((line) => {
      const parts = line.split(" | ");

      const array = parts[0].split(" ").map((s) => s.split("").sort().join(""));
      const decoded = new Array(10).fill(0);
      const length5 = new Array();
      const length6 = new Array();

      for (let i of array) {
        if (i.length === 2) {
          decoded[1] = i;
        }
        if (i.length === 3) {
          decoded[7] = i;
        }
        if (i.length === 4) {
          decoded[4] = i;
        }
        if (i.length === 5) {
          length5.push(i);
        }
        if (i.length === 6) {
          length6.push(i);
        }
        if (i.length === 7) {
          decoded[8] = i;
        }
      }
      for (let s of length5) {
        if (count(s, decoded[7]) === 3) {
          decoded[3] = s;
        } else if (count(s, decoded[4]) === 3) {
          decoded[5] = s;
        } else {
          decoded[2] = s;
        }
      }
      for (let s of length6) {
        if (count(s, decoded[4]) === 4) {
          decoded[9] = s;
        } else if (count(s, decoded[1]) === 2) {
          decoded[0] = s;
        } else {
          decoded[6] = s;
        }
      }

      return parts[1]
        .split(" ")
        .map((s) => s.split("").sort().join(""))
        .map((s) => decoded.indexOf(s))
        .join("");
    });

    return lines.map((n) => parseInt(n)).reduce((acc, v) => acc + v, 0);
  }

  solve(input_: string) {
    const input = input_.split("\n");

    const result1 = this.part1(input);
    const result2 = this.part2(input);

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve(day08input);

    console.log("day 08 step 1: " + step1.toString());
    console.log("day 08 step 2: " + step2.toString());
  }
}
