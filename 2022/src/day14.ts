import { day14input } from "./data";
import { IDay } from "./helpers";
import { cp, readFileSync } from "fs";

enum kind {
  air = 0,
  rock = 1,
  sand = 2,
}
interface File {
  file: number[][];
  colMin: number;
  colMax: number;
  rowMax: number;
}

export class Day14 implements IDay<number[]> {
  loadFile1(input: string): File {
    let colMin = 500;
    let colMax = 500;
    let rowMax = 0;

    const file = input.split("\n").reduce((acc, line) => {
      const points = line
        .split(" -> ")
        .map((p) => p.split(",").map((v) => parseInt(v)));

      for (let i = 0; i < points.length - 1; i++) {
        const [start, end] = points.slice(i, i + 2);

        if (start[0] === end[0]) {
          if (!Array.isArray(acc[start[0]])) {
            acc[start[0]] = [];
          }
          const s = start[1] < end[1] ? start[1] : end[1];
          const e = start[1] < end[1] ? end[1] : start[1];
          for (let j = s; j <= e; j++) {
            acc[start[0]][j] = 1;
          }
        } else if (start[1] === end[1]) {
          const s = start[0] < end[0] ? start[0] : end[0];
          const e = start[0] < end[0] ? end[0] : start[0];
          for (let j = s; j <= e; j++) {
            if (!Array.isArray(acc[j])) {
              acc[j] = [];
            }
            acc[j][start[1]] = kind.rock;

            colMin = Math.min(colMin, j);
            colMax = Math.max(colMax, j);
            rowMax = Math.max(rowMax, start[1]);
          }
        }
      }

      return acc;
    }, [] as number[][]);

    return {
      colMin,
      colMax,
      rowMax,
      file: file.map((col) => {
        const result = [];

        for (let i = 0; i < col.length; i++) {
          result.push(col[i] === undefined ? kind.air : col[i]);
        }

        return result;
      }),
    };
  }

  loadFile2(input: string): File {
    let file = this.loadFile1(input);

    for (let col = 500 - file.rowMax - 3; col < 500 + file.rowMax + 3; col++) {
      if (!file.file[col]) {
        file.file[col] = [];
      }

      for (let row = 0; row < file.rowMax + 3; row++) {
        file.file[col][row] =
          file.file[col][row] ||
          (row === file.rowMax + 2 ? kind.rock : kind.air);
      }
    }

    const result = {
      file: file.file,
      colMin: 500 - file.rowMax - 2,
      colMax: 500 + file.rowMax + 2,
      rowMax: file.rowMax + 2,
    };

    return result;
  }

  solve1and2(file: File) {
    let step = 0,
      possible = true,
      counter = 0;

    let row = 0;
    let col = 500;

    while (possible) {
      counter++;

      if (col < file.colMin || col > file.colMax || row > file.rowMax) {
        possible = false;
      } else if (
        col > file.colMin &&
        col < file.colMax &&
        file.file[col - 1]?.[row + 1] !== kind.air &&
        file.file[col][row + 1] !== kind.air &&
        file.file[col + 1]?.[row + 1] !== kind.air
      ) {
        file.file[col][row] = kind.sand;
        step++;
        if (col === 500 && row === 0) {
          possible = false;
        }
        row = 0;
        col = 500;
      } else if (file.file[col]?.[row + 1] === kind.air) {
        row += 1;
      } else if (file.file[col - 1]?.[row + 1] === kind.air) {
        row += 1;
        col -= 1;
      } else if (file.file[col + 1]?.[row + 1] === kind.air) {
        row += 1;
        col += 1;
      } else {
        possible = false;
      }
    }

    return step;
  }

  step2(file: File) {
    return file.rowMax * 2;
  }

  solve(input: string) {
    const file1 = this.loadFile1(input);
    const file2 = this.loadFile2(input);

    const step1 = this.solve1and2(file1);
    const step2 = this.solve1and2(file2);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day14input);

    console.log(`day 14 step 1: ${step1}`);
    console.log(`day 14 step 2: ${step2}`);
  }
}
