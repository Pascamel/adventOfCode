import { IDay } from './helpers';
import { readFileSync } from 'fs';

export class Day5 implements IDay {
  getStacksAndMoves(fileName: string) {
    const file = readFileSync(fileName, 'utf-8').split('\n');

    const moves = file
      .splice(file.findIndex((s) => s.startsWith('move')))
      .map((move) => {
        const [scount, s] = move.replace('move ', '').split(' from ');
        const [sfrom, sto] = s.split(' to ');
        return [scount, sfrom, sto].map((v) => parseInt(v));
      });

    const stacks = file
      .slice(0, -2)
      .reduce(
        (acc, s) => {
          let i = 0;
          while (i * 4 + 1 < s.length) {
            if (acc.length < i + 1) {
              acc.push([]);
            }
            const v = s.substring(i * 4 + 1, i * 4 + 2);
            if (v !== ' ') {
              acc[i].push(s.substr(i * 4 + 1, 1));
            }
            i++;
          }
          return acc;
        },
        [[]] as string[][]
      )
      .map((stack) => stack.reverse());

    return { stacks, moves };
  }

  solveStep1(fileName: string) {
    const { stacks, moves } = this.getStacksAndMoves(fileName);

    for (const [count, from, to] of moves) {
      for (let i = 0; i < count; i++) {
        stacks[to - 1].push(stacks[from - 1].pop() ?? '');
      }
    }

    return stacks.map((s) => s.pop()).join('');
  }

  solveStep2(fileName: string) {
    const { stacks, moves } = this.getStacksAndMoves(fileName);

    for (const [count, from, to] of moves) {
      const values = stacks[from - 1].splice(
        stacks[from - 1].length - count,
        stacks[from - 1].length
      );

      stacks[to - 1] = stacks[to - 1].concat(values);
    }

    return stacks.map((s) => s.pop()).join('');
  }

  solve(fileName: string) {
    const step1 = this.solveStep1(fileName);
    const step2 = this.solveStep2(fileName);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day5.input');

    console.log('day 5 step 1: ' + step1.toString());
    console.log('day 5 step 2: ' + step2.toString());
  }
}
