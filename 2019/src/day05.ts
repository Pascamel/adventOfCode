import { IDay } from "./helpers";
import { day05input } from "./data";

export class Day05 implements IDay {
  getParameterModes(memory: number[], command: number, pos: number): number[] {
    // pad to 5 chars, extract ABCDE pattern
    const modes = ("00000" + String(command)).slice(-5).split("").map(Number);

    return [
      modes[2] === 0 ? memory[pos + 1] : pos + 1,
      modes[1] === 0 ? memory[pos + 2] : pos + 2,
      modes[0] === 0 ? memory[pos + 3] : pos + 3,
    ];
  }

  runProgram(memory: number[], inputValue: number): number {
    let pos = 0;
    let outputs: number[] = [];

    while (memory[pos] !== 99) {
      const opcode = memory[pos] % 10;
      const [p1, p2, p3] = this.getParameterModes(memory, memory[pos], pos);

      if (opcode === 1) {
        memory[p3] = memory[p1] + memory[p2];
        pos += 4;
      } else if (opcode === 2) {
        memory[p3] = memory[p1] * memory[p2];
        pos += 4;
      } else if (opcode === 3) {
        memory[p1] = inputValue;
        pos += 2;
      } else if (opcode === 4) {
        outputs.push(memory[p1]);
        pos += 2;
      } else if (opcode === 5) {
        pos = memory[p1] !== 0 ? memory[p2] : pos + 3;
      } else if (opcode === 6) {
        pos = memory[p1] === 0 ? memory[p2] : pos + 3;
      } else if (opcode === 7) {
        memory[p3] = memory[p1] < memory[p2] ? 1 : 0;
        pos += 4;
      } else if (opcode === 8) {
        memory[p3] = memory[p1] === memory[p2] ? 1 : 0;
        pos += 4;
      } else {
        throw new Error("Unknown opcode: " + opcode);
      }
    }

    return outputs[outputs.length - 1];
  }

  // -------------------------------------------------
  // Solve function (matches your Python behavior)
  // -------------------------------------------------
  solve(input: string): [number, number] {
    const baseProgram = input.split(",").map(Number);

    const step1 = this.runProgram([...baseProgram], 1);
    const step2 = this.runProgram([...baseProgram], 5);

    return [step1, step2];
  }

  run(): void {
    const [step1, step2] = this.solve(day05input);

    console.log(`Day 05 step 1: ${step1}`);
    console.log(`Day 05 step 2: ${step2}`);
  }
}
