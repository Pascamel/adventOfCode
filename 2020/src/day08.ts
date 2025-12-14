import { day08sample } from "./data";
import { IDay } from "./helpers";

type Data = { instruction: "acc" | "jmp" | "nop"; value: number }[];
export class Day08 implements IDay {
  loadFile(input: string): Data {
    return input.split("\n").map((line) => ({
      instruction: line.split(" ")[0] as "acc" | "jmp" | "nop",
      value: parseInt(line.split(" ")[1], 10),
    }));
  }

  part1(data: Data): number {
    let accumulator = 0;
    let index = 0;
    const visited = new Set<number>();

    while (index < data.length) {
      if (visited.has(index)) {
        return accumulator;
      }

      visited.add(index);

      const { instruction, value } = data[index];

      if (instruction === "acc") {
        accumulator += value;
        index++;
      } else if (instruction === "jmp") {
        index += value;
      } else if (instruction === "nop") {
        index++;
      }
    }

    return accumulator;
  }

  part2(data: Data): number {
    let accumulator = 0;
    let index = 0;
    const visited = new Set<number>();

    const SWITCH: Record<"jmp" | "nop" | "acc", "jmp" | "nop" | "acc"> = {
      jmp: "nop",
      nop: "jmp",
      acc: "acc",
    };

    for (let i = 0; i < data.length; i++) {
      accumulator = 0;
      index = 0;
      visited.clear();

      while (index < data.length) {
        if (visited.has(index)) {
          break;
        }

        visited.add(index);

        const { instruction: inst, value } = data[index];
        const instruction = index === i ? SWITCH[inst] : inst;

        if (instruction === "acc") {
          accumulator += value;
          index++;
        } else if (instruction === "jmp") {
          index += value;
        } else if (instruction === "nop") {
          index++;
        }
      }

      if (index === data.length) {
        return accumulator;
      }
    }

    return accumulator;
  }

  solve(input: string) {
    const data = this.loadFile(input);

    const step1 = this.part1(data);
    const step2 = this.part2(data);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day08sample);

    console.log(`day 08 step 1: ${step1}`);
    console.log(`day 08 step 2: ${step2}`);
  }
}
