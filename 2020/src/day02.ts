import { IDay } from "./helpers";
import { day02input } from "./data";

type Line = {
  min: number;
  max: number;
  character: string;
  password: string;
};

export class Day02 implements IDay {
  private part1(lines: Line[]): number {
    return lines.filter((line) => {
      const count = line.password.split(line.character).length - 1;

      return count >= line.min && count <= line.max;
    }).length;
  }

  private part2(lines: Line[]): number {
    return lines.filter((line) => {
      const minEqual = line.password[line.min - 1] === line.character;
      const maxEqual = line.password[line.max - 1] === line.character;

      return (minEqual && !maxEqual) || (!minEqual && maxEqual);
    }).length;
  }

  solve(input: string) {
    const lines = input
      .trim()
      .split(/\r?\n/)
      .map((line) => {
        return {
          min: parseInt(line.split(": ")[0].split("-")[0], 10),
          max: parseInt(line.split(": ")[0].split("-")[1], 10),
          character: line.split(": ")[0].split(" ")[1],
          password: line.split(": ")[1],
        };
      });

    const step1 = this.part1(lines);
    const step2 = this.part2(lines);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day02input);

    console.log(`Day 02 step 1: ${step1}`);
    console.log(`Day 02 step 2: ${step2}`);
  }
}
