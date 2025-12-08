import { IDay } from "./helpers";
import { day05input } from "./data";

export class Day05 implements IDay {
  // -------------------------------------------------
  // Decode parameters based on parameter mode settings
  // -------------------------------------------------
  private getParameterModes(
    memory: number[],
    command: number,
    pos: number
  ): number[] {
    // pad to 5 chars, extract ABCDE pattern
    const modes = ("00000" + String(command)).slice(-5).split("").map(Number);

    // modes[2] = mode of param1, modes[1] = mode of param2, modes[0] = mode of param3
    return [
      modes[2] === 0 ? memory[pos + 1] : pos + 1,
      modes[1] === 0 ? memory[pos + 2] : pos + 2,
      modes[0] === 0 ? memory[pos + 3] : pos + 3,
    ];
  }

  // -------------------------------------------------
  // Intcode interpreter
  // -------------------------------------------------
  private runProgram(memory: number[], inputValue: number): number {
    let pos = 0;
    let outputs: number[] = [];

    while (memory[pos] !== 99) {
      const opcode = memory[pos] % 10;
      const [p1, p2, p3] = this.getParameterModes(memory, memory[pos], pos);

      switch (opcode) {
        case 1: // add
          memory[p3] = memory[p1] + memory[p2];
          pos += 4;
          break;

        case 2: // multiply
          memory[p3] = memory[p1] * memory[p2];
          pos += 4;
          break;

        case 3: // input
          memory[p1] = inputValue;
          pos += 2;
          break;

        case 4: // output
          outputs.push(memory[p1]);
          pos += 2;
          break;

        case 5: // jump-if-true
          pos = memory[p1] !== 0 ? memory[p2] : pos + 3;
          break;

        case 6: // jump-if-false
          pos = memory[p1] === 0 ? memory[p2] : pos + 3;
          break;

        case 7: // less-than
          memory[p3] = memory[p1] < memory[p2] ? 1 : 0;
          pos += 4;
          break;

        case 8: // equals
          memory[p3] = memory[p1] === memory[p2] ? 1 : 0;
          pos += 4;
          break;

        default:
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
    const [s1, s2] = this.solve("./day5.input");

    console.log("day 05 step 1: " + s1.toString());
    console.log("day 05 step 2: " + s2.toString());
  }
}
