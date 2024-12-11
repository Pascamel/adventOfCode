import { readFileSync } from 'fs';
import { IDay } from './helpers';

export class Day11 implements IDay<number[]> {
  map: Map<string, number> = new Map();

  blink (stone:number) {   
    if (stone === 0) {
      return [1];
    }
    if (stone.toString().length % 2 === 0) {
      const numberStr = stone.toString();
      const half = numberStr.length / 2;
      const left = Number(numberStr.slice(0, half));
      const right = Number(numberStr.slice(half));
      return [left, right];
    }
    return [stone*2024];
  } 

  worker (stones:number[], step:number):number {
    if (step === 0) {
      return stones.length;
    }

    const key = `${stones.join('-')}-${step}`;
    if (this.map.has(key)) {
      return this.map.get(key)!;
    }
    
    const result = stones.map(s => this.blink(s))
      .flat()
      .reduce((acc, s) => acc + this.worker([s], step-1), 0);
    this.map.set(key, result);

    return result;
  }

  solve(input: string) {
    this.map = new Map();    

    const step1 = this.worker(input.split(' ').map(Number), 25);
    const step2 = this.worker(input.split(' ').map(Number), 75);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('5 62914 65 972 0 805922 6521 1639064');

    console.log(`day 11 step 1: ${step1}`); // 199753
    console.log(`day 11 step 2: ${step2}`); // 239413123020116
  }
}
