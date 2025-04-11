import { day15sample1, day15sample2, day15input } from './data';
import { IDay } from './helpers';

// type Point = { row: number; col: number };

export class Day15 implements IDay<number[]> {
  map: number[][] = [];
  
  // # wall -1
  // O box   1
  // . nothing 0
  // <^v>
  loadMap(input: string) {
    this.map = input
      .split('\n')
      .map((line) => line.split('').map((n) => parseInt(n)));
  } 

  solve(input: string) {
    this.loadMap(input);

    const step1 = 123;
    const step2 = 456;

    return [step1, step2];
  }

  run() {
    const [step11, step21] = this.solve(day15sample1);

    console.log(`day 15 step 1: ${step11}`);
    console.log(`day 15 step 2: ${step21}`);

    const [step12, step22] = this.solve(day15sample2);

    console.log(`day 15 step 1: ${step12}`);
    console.log(`day 15 step 2: ${step22}`);

    const [step1, step2] = this.solve(day15input);

    console.log(`day 15 step 1: ${step1}`);
    console.log(`day 15 step 2: ${step2}`);
  }
}
