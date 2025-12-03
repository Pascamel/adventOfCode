import { day03input, day03sample } from './data';
import { IDay, Sum } from './helpers';

function findHighestDigits(line: number[], left:number):number[] {
  const lineWithoutLastNumbers = left===1?line: line.slice(0, 1-left);
  const maxDigit = Math.max(...lineWithoutLastNumbers);
  const highestIndex = lineWithoutLastNumbers.indexOf(maxDigit);

  if (left === 1) {
    return [lineWithoutLastNumbers[highestIndex]];
  }
  
  return [
    line[highestIndex],
    ...findHighestDigits(line.slice(highestIndex + 1), left-1)
  ]
}

export class Day03 implements IDay<number[]> {
  step1(line: number[]) {
    const highestDigits = findHighestDigits(line, 2);
    return 10 * highestDigits[0] +  highestDigits[1];
  }

  step2(line: number[]) {
    const highestDigits = findHighestDigits(line, 12);
    const powers = [10e10, 10e9, 10e8, 10e7, 10e6, 10e5, 10e4, 10e3, 10e2, 10e1, 10e0, 10e-1];
    return powers.reduce((acc, power, index) => acc + power * highestDigits[index], 0);
  }

  solve(input: string) {
    const lines = input    
      .split('\n')    
      .map((line) => line.split('').map(Number));  

    const part1 = Sum(lines.map(this.step1));
    const part2 = Sum(lines.map(this.step2));

    return [part1, part2];
  }

  run() {
    const [step1, step2] = this.solve(day03input);

    console.log(`day 03 step 1: ${step1}`);
    console.log(`day 03 step 2: ${step2}`);
  }
}