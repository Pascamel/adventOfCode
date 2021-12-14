import { readFileSync } from 'fs';
import { IDay } from './helpers';

type Grid = Array<Array<number>>;
type Instruction = { axis: string; value: number };

export class Day13 implements IDay {
  fold(grid: Grid, instruction: Instruction) {
    const { axis, value } = instruction;
    const test = grid.reduce((acc, point) => {
      const foldedPoint =
        axis === 'x'
          ? [point[0] > value ? value * 2 - point[0] : point[0], point[1]]
          : [point[0], point[1] > value ? value * 2 - point[1] : point[1]];

      if (acc.some((p) => p[0] === foldedPoint[0] && p[1] === foldedPoint[1])) {
        return acc;
      }
      return [...acc, foldedPoint];
    }, new Array<Array<number>>());

    return test;
  }

  output(grid: Grid) {
    const row = Math.max(...grid.map((p) => p[0]));
    const col = Math.max(...grid.map((p) => p[1]));

    for (let x = 0; x <= col; x++) {
      let line = '';
      for (let y = 0; y <= row; y++) {
        line += grid.some((p) => p[1] === x && p[0] === y) ? '#' : '.';
      }
      console.log(line);
    }
  }

  part1(grid: Grid, instructions: Array<Instruction>) {
    return this.fold(grid, instructions[0]).length;
  }

  part2(grid: Grid, instructions: Array<Instruction>) {
    instructions.forEach((instruction) => {
      grid = this.fold(grid, instruction);
    });

    this.output(grid);

    return 456;
  }

  solve(fileName: string) {
    const input = readFileSync(fileName, 'utf-8').split('\n');
    const grid = input
      .filter((line) => line.indexOf(',') !== -1)
      .reduce((acc, line) => {
        const parts = line.split(',').map((n) => parseInt(n));
        return [...acc, parts];
      }, new Array<Array<number>>());
    const instructions = input
      .filter((line) => line.startsWith('fold along'))
      .map((line) => line.replace('fold along ', '').split('='))
      .map((line) => ({ axis: line[0], value: parseInt(line[1]) }));

    let result1 = this.part1(grid, instructions);
    let result2 = this.part2(grid, instructions);

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve('data/day13.input');

    console.log('day 13 step 1: ' + step1.toString());
    console.log('day 13 step 2: ' + step2.toString());
  }
}
