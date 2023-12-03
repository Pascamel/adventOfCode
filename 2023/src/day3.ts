import { IDay, Sum } from './helpers';
import { readFileSync } from 'fs';

type Number = { row: number; start: number; end: number };
type Gear = { row: number; col: number };

export class Day3 implements IDay<number[]> {
  extractNumbers(lines: string[]): Number[] {
    const numbers: Number[] = [];
    for (const [row, line] of lines.entries()) {
      let start = -2;

      for (const [col, char] of line.split('').entries()) {
        if (!isNaN(parseInt(char))) {
          if (start == -2) {
            start = col;
          }
          if (col === line.length - 1) {
            if (start > -2) {
              numbers.push({ row, start, end: col });
            }
          }
        } else {
          if (start > -2) {
            numbers.push({ row, start, end: col - 1 });
            start = -2;
          }
        }
      }
    }

    return numbers;
  }

  extractGears(lines: string[]): Gear[] {
    const gears: Gear[] = [];

    for (const [row, line] of lines.entries()) {
      for (const [col, char] of line.split('').entries()) {
        if (char === '*') {
          gears.push({ row, col });
        }
      }
    }

    return gears;
  }

  isPart(number: Number, file: string[]): boolean {
    const { row, start, end } = number;
    const s = Math.max(start - 1, 0);
    const e = Math.min(end + 1, file[row].length) + 1;

    const one = row === 0 ? '' : file[row - 1].substring(s, e);
    const two = file[row].substring(s, e);
    const three = row === file.length - 1 ? '' : file[row + 1].substring(s, e);

    return `${one}${two}${three}`.replace(/[\.0-9]/gi, '').length > 0;
  }

  valuePart(number: Number, file: string[]) {
    const { row, start, end } = number;
    return parseInt(file[row].substring(start, end + 1));
  }

  isPartNear(number: Number, gear: Gear, file: string[]): boolean {
    return (
      gear.row >= number.row - 1 &&
      gear.row <= number.row + 1 &&
      gear.col >= number.start - 1 &&
      gear.col <= number.end + 1
    );
  }

  solve(fileName: string) {
    const file = readFileSync(fileName, 'utf-8').split('\n');
    const parts = this.extractNumbers(file).filter((n) => this.isPart(n, file));
    const gears = this.extractGears(file);

    const step1 = parts.map((n) => this.valuePart(n, file)).reduce(Sum);

    const step2 = gears
      .map((gear) => {
        const n = parts
          .filter((part) => this.isPartNear(part, gear, file))
          .map((n) => this.valuePart(n, file));

        return n.length !== 2 ? 0 : n[0] * n[1];
      })
      .reduce(Sum);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day3.input');

    console.log(`day 3 step 1: ${step1}`);
    console.log(`day 3 step 2: ${step2}`);
  }
}
