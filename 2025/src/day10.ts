import { day10sample } from "./data";
import { IDay } from "./helpers";
import { init } from "z3-solver";

export class Day10 {
  compareLights(state: boolean[], lights: boolean[]) {
    return state.every((value, index) => value === lights[index]);
  }

  pressButtons(state: boolean[], buttons: number[]) {
    return state.map((value, index) => (buttons.includes(index) ? !value : value));
  }

  part1(lines: { lights: boolean[]; buttons: number[][] }[]) {
    return lines.reduce((acc, line) => {
      // build an array of the same length as lights, with all values = false
      let states = [new Array(line.lights.length).fill(false)];
      let presses = 0;
      let found = false;

      while (!found) {
        presses++;
        const newStates = [];

        for (const state of states) {
          for (const button of line.buttons) {
            const newState = this.pressButtons(state, button);
            if (this.compareLights(newState, line.lights)) {
              found = true;
              break;
            }
            newStates.push(newState);
          }
        }

        states = newStates;
      }

      return acc + presses;
    }, 0);
  }

  async solveLine(Z3: any, line: { buttons: number[][]; joltage: number[] }): Promise<number> {
    const ctx = Z3.Context("main");
    const Int = ctx.Int;
    const Optimize = ctx.Optimize;

    const solver = new Optimize();
    const vars: any[] = [];

    for (let i = 0; i < line.buttons.length; i++) {
      const v = Int.const(String.fromCharCode(97 + i));
      solver.add(v.ge(Int.val(0)));
      vars.push(v);
    }

    for (let i = 0; i < line.joltage.length; i++) {
      let expr = Int.val(0).add(Int.val(0)); // ArithExpr

      for (let j = 0; j < line.buttons.length; j++) {
        if (line.buttons[j].includes(i)) {
          expr = expr.add(vars[j]);
        }
      }

      solver.add(expr.eq(Int.val(line.joltage[i])));
    }

    const sum = vars.reduce((acc, v) => acc.add(v), Int.val(0));
    solver.minimize(sum);

    const status = await solver.check();
    if (status !== "sat") return 0;

    const model = solver.model();
    return parseInt(model.eval(sum).toString(), 10);
  }

  async part2(lines: { buttons: number[][]; joltage: number[] }[]) {
    return init().then(async (Z3) => {
      const promises = lines.map((line) => this.solveLine(Z3, line));
      const results = await Promise.all(promises);
      return results.reduce((a, b) => a + b, 0);
    });
  }

  async solve(input: string) {
    const lines = input.split("\n").map((line) => {
      const [first, ...rest] = line.split(" ");
      const last = rest.pop();
      return {
        lights: first
          .slice(1, -1)
          .split("")
          .map((c) => c === "#"),
        buttons: rest.map((line) => line.slice(1, -1).split(",").map(Number)),
        joltage: last!.slice(1, -1).split(",").map(Number),
      };
    });

    const step1 = this.part1(lines);
    const step2 = await this.part2(lines);

    return [step1, step2];
  }

  async run() {
    const [step1, step2] = await this.solve(day10sample);

    console.log(`day 10 step 1: ${step1}`);
    console.log(`day 10 step 2: ${step2}`);
  }
}
