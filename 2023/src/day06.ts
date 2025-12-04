import { day06sample } from "./data";
import { IDay, Sum } from "./helpers";

const DIGITS = "zero,one,two,three,four,five,six,seven,eight,nine".split(",");

function parseLines(lines: string[]) {
  const parse = (line: string) => line.split(":")[1].trim().split(/\s+/).map(Number);
  const times = parse(lines[0]);
  const distances = parse(lines[1]);

  return times.map((time, i) => ({
    time,
    distance: distances[i],
  }));
}

export class Day06 implements IDay<number[]> {
  solveRace(line: { time: number; distance: number }) {
    let result = 0;
    for (let speed = 1; speed < line.time; speed++) {
      const score = (line.time - speed) * speed;
      if (score > line.distance) {
        result++;
      }
    }
    return result;
  }

  solve(input: string) {
    const lines = parseLines(input.split("\n"));

    const step1 = lines.reduce((acc, line) => acc * this.solveRace(line), 1);

    const step2 = this.solveRace(
      lines.reduce(
        (acc, line) => ({
          time: acc.time === 0 ? line.time : parseInt(`${acc.time}${line.time}`),
          distance:
            acc.distance === 0 ? line.distance : parseInt(`${acc.distance}${line.distance}`),
        }),
        {
          time: 0,
          distance: 0,
        }
      )
    );

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day06sample);

    console.log(`day 06 step 1: ${step1}`);
    console.log(`day 06 step 2: ${step2}`);
  }
}
