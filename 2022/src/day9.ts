import { IDay } from './helpers';
import { readFileSync } from 'fs';

export class Day9 implements IDay {
  directions(direction: string) {
    if (direction === 'R') return [1, 0];
    if (direction === 'L') return [-1, 0];
    if (direction === 'U') return [0, -1];
    if (direction === 'D') return [0, 1];
    return [0, 0];
  }

  areNeighbors(head: [number, number], tail: [number, number]) {
    return Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1;
  }

  helper(lines: { direction: string; times: number }[], length: number) {
    let rope = Array.from(
      { length },
      (e) => Array(2).fill(0) as [number, number]
    );
    const seen = new Set();

    for (const { direction: d, times } of lines) {
      const [dx, dy] = this.directions(d);
      for (let i = 0; i < times; i++) {
        const [hx, hy] = rope[0];
        rope[0] = [hx + dx, hy + dy];

        for (let j = 1; j < rope.length; j++) {
          const prev = rope[j - 1],
            current = rope[j];

          while (!this.areNeighbors(prev, current)) {
            if (Math.abs(prev[0] - current[0]) > 0) {
              current[0] += Math.sign(prev[0] - current[0]);
            }
            if (Math.abs(prev[1] - current[1]) > 0) {
              current[1] += Math.sign(prev[1] - current[1]);
            }
          }

          seen.add(rope.slice(-1).join(','));
        }
      }
    }

    return seen.size;
  }

  solve(fileName: string) {
    const file = readFileSync(fileName, 'utf-8')
      .split('\n')
      .map((line) => {
        const parts = line.split(' ');
        return {
          direction: parts[0],
          times: parseInt(parts[1]),
        };
      });

    const step1 = this.helper(file, 2);
    const step2 = this.helper(file, 10);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day9.input');

    console.log('day 9 step 1: ' + step1.toString());
    console.log('day 9 step 2: ' + step2.toString());
  }
}
