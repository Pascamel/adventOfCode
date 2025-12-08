import { readFileSync } from "fs";
import { IDay } from "./helpers";
import { day04input } from "./data";

export class Day4 implements IDay {
  lineWins = (v1: number, v2: number, v3: number, v4: number, v5: number) =>
    v1 === -1 && v2 === -1 && v3 === -1 && v4 === -1 && v5 === -1;

  gridWins = (grid: Array<number>) => {
    return [
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
    ].reduce(
      (acc, v) =>
        acc ||
        this.lineWins(
          grid[v[0]],
          grid[v[1]],
          grid[v[2]],
          grid[v[3]],
          grid[v[4]]
        ),
      false
    );
  };

  scoreGrid = (grid: Array<number>, lastDraw: number) =>
    lastDraw * grid.filter((v) => v !== -1).reduce((acc, v) => acc + v, 0);

  step1 = (grids: Array<Array<number>>, draw: Array<number>) => {
    for (const num of draw) {
      grids = grids.map((grid) =>
        grid.map((value) => (value === num ? -1 : value))
      );

      let winners = grids.filter(this.gridWins);
      if (winners.length > 0) {
        return this.scoreGrid(winners[0], num);
      }
    }

    return -1;
  };

  step2 = (grids: Array<Array<number>>, draw: Array<number>) => {
    for (const num of draw) {
      grids = grids.map((grid) =>
        grid.map((value) => (value === num ? -1 : value))
      );

      if (grids.length === 1 && this.gridWins(grids[0])) {
        return this.scoreGrid(grids[0], num ?? 0);
      }

      grids = grids.filter((grid) => !this.gridWins(grid));
    }

    return -1;
  };

  solve(input_: string) {
    const input = input_.split("\n");
    const draw = input[0].split(",").map((n) => parseInt(n));
    const grids = input.reduce((acc: Array<Array<number>>, line, index) => {
      if (index === 0) {
        return acc;
      }
      if (line === "") {
        return [...acc, []];
      }
      const last: Array<number> = acc.pop() || [];
      const ints = line
        .split(" ")
        .filter((s) => s.length > 0)
        .map((n) => parseInt(n));
      return [...acc, [...last, ...ints]];
    }, []);

    const result1 = this.step1(grids, draw);
    const result2 = this.step2(grids, draw);

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve(day04input);

    console.log("day 4 step 1: " + step1.toString());
    console.log("day 4 step 2: " + step2.toString());
  }
}
