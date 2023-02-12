import { IDay } from './helpers';
import { readFileSync } from 'fs';

export class Day10 implements IDay<[number, string]> {
  solve(fileName: string) {
    const file = readFileSync(fileName, 'utf-8')
      .split('\n')
      .map((line) => line.split(' '))
      .map((v) =>
        v.length > 1 ? { cmd: v[0], value: parseInt(v[1], 10) } : { cmd: v[0] }
      );

    let x = 1;
    const cycles: number[] = [0];
    for (let line of file) {
      cycles.push(x);
      if (line.cmd !== 'noop') {
        x += line.value ?? 0;
        cycles.push(x);
      }
    }

    const step1 = [20, 60, 100, 140, 180, 220]
      .map((v) => v * cycles[v - 1])
      .reduce((a, b) => a + b);

    const step2 = ['', '', '', '', '', ''];
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 40; col++) {
        const x = cycles[row * 40 + col];

        step2[row] += x >= col - 1 && x <= col + 1 ? '#' : '.';
      }
    }

    return [step1, step2.join('')] as [number, string];
  }

  run() {
    const [step1, step2] = this.solve('data/day10.input');

    console.log('day 10 step 1: ' + step1.toString());
    console.log('day 10 step 2: ' + step2.toString());
  }
}
