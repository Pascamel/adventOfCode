import { IDay } from "./helpers";
import { day04input } from "./data";

export class Day04 implements IDay {
  private getDigits(n: number): number[] {
    return [
      Math.floor(n / 100000),
      Math.floor(n / 10000) % 10,
      Math.floor(n / 1000) % 10,
      Math.floor(n / 100) % 10,
      Math.floor(n / 10) % 10,
      n % 10,
    ];
  }

  solve(input: string) {
    const [start, end] = input.split("-").map(Number);

    let step1 = 0;
    let step2 = 0;

    // ------------------------------
    // Part 1
    // ------------------------------
    for (let i = start; i <= end; i++) {
      const digits = this.getDigits(i);

      // must have adjacent equal digits
      const hasDouble = digits.some(
        (d, idx) => idx < 5 && digits[idx] === digits[idx + 1]
      );
      if (!hasDouble) continue;

      // must never decrease
      const decreases = digits.some(
        (d, idx) => idx < 5 && digits[idx] > digits[idx + 1]
      );
      if (decreases) continue;

      step1++;
    }

    // ------------------------------
    // Part 2
    // ------------------------------
    for (let i = start; i <= end; i++) {
      const digits = this.getDigits(i);

      // Must have a *strict* double: exactly two adjacent equal digits
      const hasStrictDouble = digits.some((d, idx) => {
        if (idx >= 5) return false;
        if (digits[idx] !== digits[idx + 1]) return false;

        // ensure not part of a bigger group
        const leftDifferent = idx === 0 || digits[idx - 1] !== digits[idx];
        const rightDifferent = idx === 4 || digits[idx + 2] !== digits[idx + 1];

        return leftDifferent && rightDifferent;
      });

      if (!hasStrictDouble) continue;

      // must never decrease
      const decreases = digits.some(
        (d, idx) => idx < 5 && digits[idx] > digits[idx + 1]
      );
      if (decreases) continue;

      step2++;
    }

    return [step1, step2];
  }

  run() {
    const [s1, s2] = this.solve(day04input);

    console.log("day 04 step 1: " + s1.toString());
    console.log("day 04 step 2: " + s2.toString());
  }
}
