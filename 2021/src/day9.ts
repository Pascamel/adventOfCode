import { readFileSync } from 'fs';
import { IDay } from './helpers';

export class Day9 implements IDay {
  lowPoints(input: Array<Array<number>>) {
    let result = [];

    for (let r = 0; r < input.length; r++) {
      for (let c = 0; c < input[r].length; c++) {
        if (r > 0 && input[r][c] >= input[r - 1][c]) {
          continue;
        }
        if (r < input.length - 1 && input[r][c] >= input[r + 1][c]) {
          continue;
        }
        if (c > 0 && input[r][c] >= input[r][c - 1]) {
          continue;
        }
        if (c < input[r].length - 1 && input[r][c] >= input[r][c + 1]) {
          continue;
        }
        result.push([r, c]);
      }
    }
    return result;
  }

  part1(input: Array<Array<number>>) {
    return this.lowPoints(input).reduce(
      (acc, v) => acc + input[v[0]][v[1]] + 1,
      0
    );
  }

  neighbors(point: Array<number>, input: Array<Array<number>>) {
    return [
      point[0] === 0 ? [] : [point[0] - 1, point[1]],
      point[0] === input.length - 1 ? [] : [point[0] + 1, point[1]],
      point[1] === 0 ? [] : [point[0], point[1] - 1],
      point[1] === input[point[0]].length - 1 ? [] : [point[0], point[1] + 1],
    ].filter((point) => point.length === 2 && input[point[0]][point[1]] < 9);
  }

  part2(input: Array<Array<number>>) {
    const basins = this.lowPoints(input).map((p) => {
      let basin = [p];
      let candidates = this.neighbors(p, input);

      while (candidates.length > 0) {
        const cand = candidates.shift();

        if (cand && !basin.find((p) => p[0] === cand[0] && p[1] === cand[1])) {
          basin.push(cand);
          candidates = [...candidates, ...this.neighbors(cand, input)];
        }
      }
      return basin.length;
    }, 0);

    return basins
      .sort((a, b) => a - b)
      .slice(-3)
      .reduce((acc, v) => acc * v, 1);
  }

  solve(fileName: string) {
    const input = readFileSync(fileName, 'utf-8')
      .split('\n')
      .map((line) => line.split('').map((num) => parseInt(num)));

    let result1 = this.part1(input);
    let result2 = this.part2(input);

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve('data/day9.input');

    console.log('day 9 step 1: ' + step1.toString());
    console.log('day 9 step 2: ' + step2.toString());
  }
}
