import { day02input } from "./data";
import { IDay } from "./helpers";

export class Day02 implements IDay {
  private helper(listInts: number[]): number {
    let pos = 0;

    while (pos < listInts.length - 4) {
      const opcode = listInts[pos];

      if (opcode === 99) {
        return listInts[0];
      } else if (opcode === 1) {
        // add
        const a = listInts[listInts[pos + 1]];
        const b = listInts[listInts[pos + 2]];
        const dest = listInts[pos + 3];
        listInts[dest] = a + b;
        pos += 4;
      } else if (opcode === 2) {
        // multiply
        const a = listInts[listInts[pos + 1]];
        const b = listInts[listInts[pos + 2]];
        const dest = listInts[pos + 3];
        listInts[dest] = a * b;
        pos += 4;
      } else {
        return -1; // invalid opcode
      }
    }

    return -1;
  }

  solve(input: string) {
    const listInput = input
      .trim()
      .split(",")
      .map((x) => parseInt(x, 10));

    // -------------------------
    // PART 1
    // -------------------------
    const list1 = [...listInput];
    list1[1] = 12;
    list1[2] = 2;

    const part1 = this.helper(list1);

    // -------------------------
    // PART 2
    // -------------------------
    let part2 = -1;

    for (let noun = 0; noun < 80; noun++) {
      for (let verb = 0; verb < 80; verb++) {
        const list2 = [...listInput];
        list2[1] = noun;
        list2[2] = verb;

        if (this.helper(list2) === 19690720) {
          part2 = 100 * noun + verb;
          break;
        }
      }
      if (part2 !== -1) break;
    }

    return [part1, part2];
  }

  run() {
    const [finale1, finale2] = this.solve(day02input);

    console.log("day 02 step 1: " + finale1.toString());
    console.log("day 02 step 2: " + finale2.toString());
  }
}
