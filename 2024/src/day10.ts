import { day10input } from './data';
import { IDay } from './helpers';

type Point = { row: number; col: number };

export class Day10 implements IDay<number[]> {
  map: number[][] = [];

  loadMap(input: string) {
    this.map = input
      .split('\n')
      .map((line) => line.split('').map((n) => parseInt(n)));
  }

  onMap(point: Point): boolean {
    return (
      point.row >= 0 &&
      point.row < this.map.length &&
      point.col >= 0 &&
      point.col < this.map[point.row].length
    );
  }

  height(point: Point): number {
    return this.map[point.row][point.col];
  }

  canClimb(point: Point): string[] {
    const { row, col } = point;

    if (this.height(point) === 9) {
      return [`${row}-${col}`];
    }

    const expected = this.map[row][col] + 1;
    const candidates = [
      { row: row - 1, col: col },
      { row: row, col: col - 1 },
      { row: row, col: col + 1 },
      { row: row + 1, col: col },
    ];

    return candidates.reduce(
      (acc, candidate) => [
        ...acc,
        ...(this.onMap(candidate) && this.height(candidate) === expected
          ? this.canClimb(candidate)
          : []),
      ],
      [] as string[]
    );
  }

  uniqueStrings(list: string[]) {
    return list.filter((s, i) => list.findIndex((p) => p === s) === i);
  }

  walk(countUniques: boolean) {
    let summits: string[][] = [];

    for (let row = 0; row < this.map.length; row++) {
      for (let col = 0; col < this.map[row].length; col++) {
        if (this.map[row][col] === 0) {
          const point = { row, col };
          const paths = this.canClimb(point);

          summits.push(countUniques ? this.uniqueStrings(paths) : paths);
        }
      }
    }

    return summits.reduce((acc, list) => acc + list.length, 0);
  }

  solve(input: string) {
    this.loadMap(input);

    const step1 = this.walk(true);
    const step2 = this.walk(false);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day10input);

    console.log(`day 10 step 1: ${step1}`);
    console.log(`day 10 step 2: ${step2}`);
  }
}
