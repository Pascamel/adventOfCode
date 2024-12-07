import { readFileSync } from 'fs';
import { IDay, Sum } from './helpers';

type Line = {
  expected: number;
  numbers: number[];
}
export class Day7 implements IDay<number[]> {
  solve(fileName: string) {
    const lines = readFileSync(fileName, 'utf-8').split('\n').map((line) => {
      const parts = line.split(': ');
      return {
        expected: parseInt(parts[0]),
        numbers: parts[1].split(' ').map((x) => parseInt(x)),
      };
    });

    const plus = (numbers: number[]) => [numbers[0] + numbers[1], ...numbers.slice(2)];

    const times = (numbers: number[]) => [numbers[0] * numbers[1], ...numbers.slice(2)];

    const pipe = (numbers: number[]) => [parseInt(`${numbers[0]}${numbers[1]}`), ...numbers.slice(2)];

    const solve = (line: Line, concat: boolean) => {      
      if(line.numbers.length<1) {
        return false;
      } 
      if (line.numbers.length === 1) {
        return line.expected === line.numbers[0];
      }
      
      if (solve({...line, numbers: plus(line.numbers)}, concat)) {
        return true;
      } 

      if (solve({...line, numbers: times(line.numbers)}, concat)) {
        return true;
      } 

      if (concat) {
        if (solve({...line, numbers: pipe(line.numbers)}, concat)) {
          return true;
        } 
      }
      
      return false;
    }
    const step1 = lines.reduce((acc, line) => {
      return acc+(solve(line, false) ? line.expected : 0)
    }, 0); 
    
    const step2 = lines.reduce((acc, line) => {
      return acc+(solve(line, true) ? line.expected : 0)
    }, 0); 

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day7.input');

    console.log(`day 7 step 1: ${step1}`);
    console.log(`day 7 step 2: ${step2}`);
  }
}
