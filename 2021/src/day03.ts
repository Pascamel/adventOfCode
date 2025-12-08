import { IDay } from "./helpers";
import { day03input } from "./data";

export class Day03 implements IDay {
  binToNumber = (binary: string) => {
    return binary
      .split("")
      .map((n) => parseInt(n))
      .reverse()
      .reduce((acc, bit, index) => acc + bit * Math.pow(2, index), 0);
  };

  counters = (lines: Array<string>) => {
    let counters: Array<number> = new Array(lines[0].length).fill(0);

    lines.forEach((line) => {
      line.split("").forEach((bit, index) => {
        counters[index] = counters[index] + (bit === "1" ? 1 : -1);
      });
    });

    return counters;
  };

  narrowMost = (lines: Array<string>, index: number) => {
    const counters = this.counters(lines);

    return lines.filter(
      (line) => line.substr(index, 1) === (counters[index] >= 0 ? "1" : "0")
    );
  };

  narrowLeast = (lines: Array<string>, index: number) => {
    const counters = this.counters(lines);

    return lines.filter(
      (line) => line.substr(index, 1) === (counters[index] < 0 ? "1" : "0")
    );
  };

  step1 = (lines: Array<string>) => {
    const counters = this.counters(lines);
    const gamma = this.binToNumber(
      counters.map((n) => (n > 0 ? 1 : 0)).join("")
    );
    const epsilon = this.binToNumber(
      counters.map((n) => (n > 0 ? 0 : 1)).join("")
    );

    return gamma * epsilon;
  };

  step2 = (lines: Array<string>) => {
    let indexOGR = 0;
    let linesOGR = lines.slice();
    while (linesOGR.length > 1) {
      linesOGR = this.narrowMost(linesOGR, indexOGR++);
    }

    const oxygenGeneratorRating = this.binToNumber(linesOGR[0]);

    let indexCSR = 0;
    let linesCSR = lines.slice();
    while (linesCSR.length > 1) {
      linesCSR = this.narrowLeast(linesCSR, indexCSR++);
    }

    const co2ScrubberRating = this.binToNumber(linesCSR[0]);

    return oxygenGeneratorRating * co2ScrubberRating;
  };

  solve(input: string) {
    const lines = input.split("\n");

    return [this.step1(lines), this.step2(lines)];
  }

  run() {
    const [step1, step2] = this.solve(day03input);

    console.log("day 03 step 1: " + step1.toString());
    console.log("day 03 step 2: " + step2.toString());
  }
}
