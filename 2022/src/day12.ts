import { IDay } from './helpers';
import { readFileSync } from 'fs';

interface Mark {
  value: number;
  mark: string;
}

interface Point {
  row: number;
  col: number;
}

export class Day12 implements IDay<number[]> {
  directions(direction: string): Point {
    if (direction === 'right') return { row: 0, col: 1 };
    if (direction === 'left') return { row: 0, col: -1 };
    if (direction === 'up') return { row: -1, col: 0 };
    if (direction === 'down') return { row: 1, col: 0 };
    return { row: 0, col: 0 };
  }

  candidates(file: Mark[][], marks: string[]) {
    let candidates1: Point[][] = [];
    for (let row = 0; row < file.length; row++) {
      for (let col = 0; col < file.length; col++) {
        if (marks.indexOf(file[row][col].mark) > -1) {
          candidates1.push([{ row, col }]);
        }
      }
    }
    return candidates1;
  }

  pathContainsPoint(path: Point[], point: Point) {
    return (
      path.findIndex((p, idx) => p.row === point.row && p.col === point.col) >
      -1
    );
  }

  helper(file: Mark[][], candidates: Point[][]) {
    let round = 0;
    let found = false;
    while (!found) {
      round++;
      const newCandidates: Point[][] = [];

      for (const path of candidates) {
        const last = path.slice(-1)[0];
        for (let d of ['left', 'right', 'up', 'down']) {
          const dir = this.directions(d);
          const [row, col] = [last.row + dir.row, last.col + dir.col];

          if (
            row >= 0 &&
            row < file.length &&
            col >= 0 &&
            col < file[0].length
          ) {
            if (
              !path.some((p) => p.row === row && p.col === col) &&
              file[row][col].value <= file[last.row][last.col].value + 1
            ) {
              const existShorterPath = candidates.some((path) =>
                path.some((p) => p.row === row && p.col === col)
              );
              const existEquivalentPath = newCandidates.some(
                (p) => p.slice(-1)[0].row === row && p.slice(-1)[0].col === col
              );

              if (!existShorterPath && !existEquivalentPath) {
                newCandidates.push([...path, { row, col }]);
              }

              if (file[row][col].mark === 'E') {
                found = true;
              }
            }
          }
        }
      }

      candidates = newCandidates;
    }

    return round;
  }

  solve(fileName: string) {
    const file: Mark[][] = readFileSync(fileName, 'utf-8')
      .split('\n')
      .map((line) =>
        line.split('').map((mark: string) => ({
          value: (mark === 'S' ? 'a' : mark === 'E' ? 'z' : mark).charCodeAt(0),
          mark,
        }))
      );

    const step1 = this.helper(file, this.candidates(file, ['S']));
    const step2 = this.helper(file, this.candidates(file, ['S', 'a']));

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day12.input');

    console.log(`day 12 step 1: ${step1}`);
    console.log(`day 12 step 2: ${step2}`);
  }
}
