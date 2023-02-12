import { IDay } from './helpers';
import { readFileSync } from 'fs';

export class Day8 implements IDay {
  solve(fileName: string) {
    const file = readFileSync(fileName, 'utf-8')
      .split('\n')
      .map((line) => line.split('').map((v) => parseInt(v, 10)));
    const L = file.length;
    const gridVisible = Array(L)
      .fill(0)
      .map((x) => Array(L).fill(false));

    // left edge
    for (let row = 0; row < L; row++) {
      let minHeight = -1;

      for (let col = 0; col < L; col++) {
        if (minHeight < file[row][col]) {
          gridVisible[row][col] = true;
        }
        minHeight = Math.max(minHeight, file[row][col]);
      }
    }

    // right edge
    for (let row = 0; row < L; row++) {
      let minHeight = -1;

      for (let col = L - 1; col >= 0; col--) {
        if (minHeight < file[row][col]) {
          gridVisible[row][col] = true;
        }
        minHeight = Math.max(minHeight, file[row][col]);
      }
    }

    // top edge
    for (let col = 0; col < L; col++) {
      let minHeight = -1;

      for (let row = 0; row < L; row++) {
        if (minHeight < file[row][col]) {
          gridVisible[row][col] = true;
        }
        minHeight = Math.max(minHeight, file[row][col]);
      }
    }

    // bottom edge
    for (let col = 0; col < L; col++) {
      let minHeight = -1;

      for (let row = L - 1; row >= 0; row--) {
        if (minHeight < file[row][col]) {
          gridVisible[row][col] = true;
        }
        minHeight = Math.max(minHeight, file[row][col]);
      }
    }

    // scores
    const scores = Array(L)
      .fill(0)
      .map((x) => Array(L).fill(0));

    for (let row = 0; row < L; row++) {
      for (let col = 0; col < L; col++) {
        if (row === 0 || col === 0 || row === L - 1 || col === L - 1) {
          continue;
        }

        // top
        let top = 1;
        let r = row - 1;
        let seen = file[r][col];
        while (r > 0 && seen < file[row][col]) {
          top++;
          r--;
          seen = file[r][col];
        }

        // down
        let down = 1;
        r = row + 1;
        seen = file[r][col];
        while (r < L - 1 && seen < file[row][col]) {
          down++;
          r++;
          seen = file[r][col];
        }

        // left
        let left = 1;
        let c = col - 1;
        seen = file[row][c];
        while (c > 0 && seen < file[row][col]) {
          left++;
          c--;
          seen = file[row][c];
        }

        // right
        let right = 1;
        c = col + 1;
        seen = file[row][c];
        while (c < L - 1 && seen < file[row][col]) {
          right++;
          c++;
          seen = file[row][c];
        }

        scores[row][col] = top * down * left * right;
      }
    }

    const step1 = gridVisible
      .reduce((acc, v) => [...acc, ...v], [])
      .filter((v) => v).length;

    const step2 = scores
      .reduce((acc, v) => [...acc, ...v], [])
      .reduce((a, b) => Math.max(a, b));

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day8.input');

    console.log('day 8 step 1: ' + step1.toString());
    console.log('day 8 step 2: ' + step2.toString());
  }
}
