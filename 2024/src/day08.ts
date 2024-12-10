import { readFileSync } from 'fs';
import { IDay } from './helpers';

type Point = { row: number; col: number };

export class Day08 implements IDay<number[]> {
  file: string[][] = [];
  antennas: Map<string, Point[]> = new Map();

  isAntenna(char: string) {
    return (
      (char >= 'A' && char <= 'Z') ||
      (char >= 'a' && char <= 'z') ||
      (char >= '0' && char <= '9')
    );
  }

  isInGrid(row: number, col: number) {
    return (
      row >= 0 &&
      row < this.file.length &&
      col >= 0 &&
      col < this.file[row].length
    );
  }

  loadFileAntennas(fileName: string) {
    this.file = readFileSync(fileName, 'utf-8')
      .split('\n')
      .map((line) => line.split(''));
    this.antennas = new Map();

    for (let row in this.file) {
      for (let col in this.file[row]) {
        if (this.isAntenna(this.file[row][col])) {
          const key = this.file[row][col];
          if (!this.antennas.has(key)) {
            this.antennas.set(key, []);
          }
          this.antennas.get(key)!.push({ row: +row, col: +col });
        }
      }
    }
  }

  antinodes(step2: boolean) {
    return [...this.antennas.keys()].reduce((acc, key) => {
      const points = this.antennas.get(key)!;

      for (let a in points) {
        for (let b in points) {
          if (a != b) {
            const r = points[a].row - points[b].row;
            const c = points[a].col - points[b].col;

            const { row, col } = points[a];

            let i = step2 ? 0 : 1;

            while (i >= 0) {
              if (this.isInGrid(row + i * r, col + i * c)) {
                if (!acc.includes(`${row + i * r},${col + i * c}`)) {
                  acc.push(`${row + i * r},${col + i * c}`);
                }
                i++;
                if (!step2) {
                  i = -1;
                }
              } else {
                i = -1;
              }
            }
          }
        }
      }

      return acc;
    }, [] as string[]);
  }

  solve(fileName: string) {
    this.loadFileAntennas(fileName);

    const step1 = this.antinodes(false).length;
    const step2 = this.antinodes(true).length;

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day08.input');

    console.log(`day 08 step 1: ${step1}`);
    console.log(`day 08 step 2: ${step2}`);
  }
}
