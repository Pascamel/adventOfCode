import { day11input } from "./data";

import { IDay } from "./helpers";

function crawler(
  map: Map<string, string[]>,
  label: string,
  visited: Record<string, number>,
  fft: boolean = false,
  dac: boolean = false
) {
  const key = `${label},${fft},${dac}`;

  if (key in visited) {
    return visited[key];
  }

  if (label == "out") {
    if (fft && dac) {
      return 1;
    }

    return 0;
  }

  let total = 0;
  for (const out of map.get(label) ?? []) {
    total += crawler(map, out, visited, label == "fft" || fft, label == "dac" || dac);
  }

  visited[key] = total;

  return total;
}

export class Day11 implements IDay<number[]> {
  solve(input: string) {
    const lines = input
      .split("\n")
      .map((line) => [line.split(": ")[0], line.split(": ")[1].split(" ")] as [string, string[]]);
    const map = new Map<string, string[]>(lines);

    const step1 = crawler(map, "you", {}, true, true);
    const step2 = crawler(map, "svr", {});

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day11input);

    console.log(`day 11 step 1: ${step1}`);
    console.log(`day 11 step 2: ${step2}`);
  }
}
