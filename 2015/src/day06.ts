import { day06input } from './data';
import { IDay } from './helpers';

type Line = {
  cmd: string;
  pt1: Array<number>;
  pt2: Array<number>;
};

const SIZE = 1000;

export class Day06 implements IDay {
  cleanLine = (s: string): Line => {
    const numbers = s
      .split(' ')
      .slice(1)
      .join(' ')
      .split(' through ')
      .map((v) => v.split(',').map((n) => parseInt(n)));

    return {
      cmd: s.split(' ')[0],
      pt1: numbers[0],
      pt2: numbers[1],
    };
  };

  solve(data: string) {
    const input = data
      .split('\n')
      .map((s) => this.cleanLine(s.replace('turn ', '')));

    const grid1: Array<number> = new Array(SIZE * SIZE).fill(0);
    const grid2: Array<number> = new Array(SIZE * SIZE).fill(0);

    const result1 = input
      .reduce((acc, line) => {
        for (let i = line.pt1[0]; i <= line.pt2[0]; i++) {
          for (let j = line.pt1[1]; j <= line.pt2[1]; j++) {
            acc[i * SIZE + j] =
              line.cmd === 'on'
                ? 1
                : line.cmd === 'off'
                ? 0
                : 1 - acc[i * SIZE + j];
          }
        }
        return acc;
      }, grid1)
      .reduce((acc, v) => acc + v, 0);

    const result2 = input
      .reduce((acc, line) => {
        for (let i = line.pt1[0]; i <= line.pt2[0]; i++) {
          for (let j = line.pt1[1]; j <= line.pt2[1]; j++) {
            acc[i * SIZE + j] =
              line.cmd === 'on'
                ? acc[i * SIZE + j] + 1
                : line.cmd === 'off'
                ? Math.max(grid2[i * SIZE + j] - 1, 0)
                : acc[i * SIZE + j] + 2;
          }
        }
        return acc;
      }, grid2)
      .reduce((acc, v) => acc + v, 0);

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve(day06input);

    console.log('day 06 step 1: ' + step1.toString());
    console.log('day 06 step 2: ' + step2.toString());
  }
}
