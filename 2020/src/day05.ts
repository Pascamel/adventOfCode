import { day05input } from "./data";
import { IDay } from "./helpers";

export class Day05 implements IDay {
  rowToId(rowFile: string): number {
    const row = rowFile.slice(0, 7);
    const seat = rowFile.slice(7, 10);

    let r = 0;
    let s = 0;

    // Decode row (F = 0, B = 1)
    row.split("").forEach((char, i) => {
      const p1 = char === "F" ? 0 : 1;
      const p2 = row.length - i - 1;
      r += p1 * 2 ** p2;
    });

    // Decode seat (L = 0, R = 1)
    seat.split("").forEach((char, i) => {
      const p1 = char === "L" ? 0 : 1;
      const p2 = seat.length - i - 1;
      s += p1 * 2 ** p2;
    });

    return r * 8 + s;
  }

  partOne(lines: string[]): number {
    const seats = lines.map((line) => this.rowToId(line));
    return Math.max(...seats);
  }

  partTwo(lines: string[]): number {
    const seats = lines.map((line) => this.rowToId(line)).sort((a, b) => a - b);

    let index = 1;
    while (seats[index] - seats[index - 1] === 1) {
      index++;
    }

    return seats[index - 1] + 1;
  }

  solve(input: string) {
    const lines = input.split(/\r?\n/);

    const step1 = this.partOne(lines);
    const step2 = this.partTwo(lines);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day05input);

    console.log(`day 05 step 1: ${step1}`);
    console.log(`day 05 step 2: ${step2}`);
  }
}
