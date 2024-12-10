import { readFileSync } from 'fs';
import { IDay } from './helpers';

export class Day03 implements IDay {
  move = (position: number[], direction: string) => [
    position[0] + (direction === '>' ? 1 : 0) + (direction === '<' ? -1 : 0),
    position[1] + (direction === 'v' ? -1 : 0) + (direction === '^' ? 1 : 0),
  ];

  solve(fileName: string) {
    const input = readFileSync(fileName, 'utf-8').split('');

    const set1 = new Set(['0-0']);
    let position = [0, 0];

    input.forEach((direction) => {
      position = this.move(position, direction);
      set1.add(position.join('-'));
    });

    const set2 = new Set(['0-0']);
    let positions = [
      [0, 0],
      [0, 0],
    ];

    input.forEach((direction, index) => {
      positions = [
        index % 2 === 1 ? positions[0] : this.move(positions[0], direction),
        index % 2 === 0 ? positions[1] : this.move(positions[1], direction),
      ];

      set2.add(positions[index % 2].join('-'));
    });

    return [set1.size, set2.size];
  }

  run() {
    const [step1, step2] = this.solve('data/day03.input');

    console.log('day 03 step 1: ' + step1.toString());
    console.log('day 03 step 2: ' + step2.toString());
  }
}
