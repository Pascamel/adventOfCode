import { IDay } from './helpers';
import { readFileSync } from 'fs';

interface Monkey {
  items: number[];
  operation: string;
  test: number;
  true: number;
  false: number;
  inspected: number;
}

export class Day11 implements IDay<number[]> {
  readFile(fileName: string): Monkey[] {
    return readFileSync(fileName, 'utf-8')
      .split('Monkey ')
      .slice(1)
      .map((monkey) => {
        return {
          items: monkey
            .split(':')[2]
            .split(',')
            .map((v) => parseInt(v)),
          operation: monkey.split('new = ')[1].split('\n')[0].trim(),
          test: parseInt(monkey.split(':')[4].split('divisible by ')[1]),
          true: parseInt(monkey.split(':')[5].split('throw to monkey')[1]),
          false: parseInt(monkey.split(':')[6].split('throw to monkey')[1]),
          inspected: 0,
        };
      });
  }

  calculateWorry(op: string, value: number, calc: (n: number) => number) {
    return calc(eval(op.replace(/old/g, value.toString())));
  }

  solve(fileName: string) {
    let helper = (
      monkeys: Monkey[],
      rounds: number,
      calc: (n: number) => number
    ): any => {
      for (let r = 0; r < rounds; r++) {
        for (const monkey of monkeys) {
          for (const item of monkey.items) {
            monkey.inspected++;
            const val = this.calculateWorry(monkey.operation, item, calc);
            const newIdx = val % monkey.test === 0 ? monkey.true : monkey.false;
            monkeys[newIdx].items.push(val);
          }
          monkey.items = [];
        }
      }
      return monkeys
        .sort((a, b) => b.inspected - a.inspected)
        .slice(0, 2)
        .reduce((a, b) => a * b.inspected, 1);
    };

    let file = this.readFile(fileName);
    const step1 = helper(file, 20, (f) => Math.floor(f / 3));

    file = this.readFile(fileName);
    const mod = file.reduce((a, b) => a * b.test, 1);
    const step2 = helper(file, 10000, (f) => f % mod);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day11.input');

    console.log(`day 11 step 1: ${step1}`);
    console.log(`day 11 step 2: ${step2}`);
  }
}
