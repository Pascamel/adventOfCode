import { day02input } from "./data";
import { IDay } from "./helpers";
import { readFileSync } from "fs";

export class Day2 implements IDay<number[]> {
  solve(input: string) {
    const file = input.split("\n");

    const step1 = file
      .map((s: string) => {
        if (s === "A X") return 4; // rock vs rock, 3 + 1
        if (s === "A Y") return 8; // rock vs paper, 6 + 2
        if (s === "A Z") return 3; // rock vs scissors, 0 + 3
        if (s === "B X") return 1; // paper vs rock, 0 + 1
        if (s === "B Y") return 5; // paper vs paper, 3 + 2
        if (s === "B Z") return 9; // paper vs scissors, 6 + 3
        if (s === "C X") return 7; // scissors vs rock, 6 + 1
        if (s === "C Y") return 2; // scissors vs paper, 0 + 2
        if (s === "C Z") return 6; // scissors vs scissors, 3+3

        return 0;
      })
      .reduce((a: number, b: number) => a + b, 0);

    // X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. Good luck!"
    const step2 = file
      .map((s: string) => {
        if (s === "A X") return 3; // loss vs rock -> scissors, 0 + 3
        if (s === "A Y") return 4; // draw vs rock -> rock, 3 + 1
        if (s === "A Z") return 8; // win vs rock -> paper, 6 + 2
        if (s === "B X") return 1; // loss vs paper -> rock, 0 + 1
        if (s === "B Y") return 5; // draw vs paper -> paper, 3 + 2
        if (s === "B Z") return 9; // win vs paper -> scissors, 6 + 3
        if (s === "C X") return 2; // loss vs scissors -> paper, 0 + 2
        if (s === "C Y") return 6; // draw vs scissors -> scissors, 3 + 3
        if (s === "C Z") return 7; // win against scissors -> rock, 6 + 1

        return 0;
      })
      .reduce((a: number, b: number) => a + b, 0);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day02input);

    console.log(`day 2 step 1: ${step1}`);
    console.log(`day 2 step 2: ${step2}`);
  }
}
