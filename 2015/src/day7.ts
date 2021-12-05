import { readFileSync } from 'fs';
import { IDay } from './helpers';

export class Day7 implements IDay {
  isNumber = (s: string) => /\d/.test(s);

  solveCircuit(lines: Array<string>) {
    const map = new Map();

    while (lines.length > 0) {
      const line = lines.shift();
      if (!line) {
        break;
      }
      const p = line.split(' ');

      if (p.length === 3) {
        const number = this.isNumber(p[0]) ? parseInt(p[0]) : map.get(p[0]);

        if (number === undefined) {
          lines.push(line);
        } else {
          map.set(p[2], number);
        }
      } else if (p.length === 4) {
        if (map.has(p[1])) {
          map.set(p[3], ~map.get(p[1]) & 0xffff);
        } else {
          lines.push(line);
        }
      } else {
        const number1 = this.isNumber(p[0]) ? parseInt(p[0]) : map.get(p[0]);
        const number2 = this.isNumber(p[2]) ? parseInt(p[2]) : map.get(p[2]);

        if (number1 === undefined || number2 === undefined) {
          lines.push(line);
        } else {
          if (p[1] === 'AND') {
            map.set(p[4], number1 & number2);
          } else if (p[1] === 'OR') {
            map.set(p[4], number1 | number2);
          } else if (p[1] === 'RSHIFT') {
            map.set(p[4], number1 >> number2);
          } else if (p[1] === 'LSHIFT') {
            map.set(p[4], number1 << number2);
          }
        }
      }
    }

    return map;
  }

  solve(fileName: string) {
    const input = readFileSync(fileName, 'utf-8')
      .split('\n')
      .sort((a, b) => a.split(' ').length - b.split(' ').length);

    const result1 = this.solveCircuit(input.slice()).get('a');
    const result2 = this.solveCircuit(
      input.slice().map((line) => {
        if (line.endsWith(' -> b')) {
          return '3176 -> b';
        }
        return line;
      })
    ).get('a');

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve('data/day7.input');

    console.log('day 7 step 1: ' + step1.toString());
    console.log('day 7 step 2: ' + step2.toString());
  }
}
