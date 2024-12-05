import { readFileSync } from 'fs';
import { IDay } from './helpers';

type Line = { destination: number; source: number; length: number };

export class Day5 implements IDay<number[]> {
  solve(fileName: string) {
    const file = readFileSync(fileName, 'utf-8').split('\n');
    const [seed, _empty, ...otherLines] = file;

    // create seeds
    const seeds = seed
      .replace('seeds: ', '')
      .split(' ')
      .map((n) => parseInt(n));

    // list of maps
    const maps: Line[][] = [];
    otherLines.forEach((line) => {
      if (line.includes('map')) {
        maps.push([]);
        return;
      }
      if (line.length === 0) {
        return;
      }

      const numbers = line.split(' ').map((n) => parseInt(n));
      maps[maps.length - 1].push({
        destination: numbers[0],
        source: numbers[1],
        length: numbers[2],
      });
    });

    // helper to get to finale location for a seed
    const locationStep1 = (seed: number) =>
      maps.reduce((acc, map) => {
        for (const line of map) {
          if (line.source <= acc && acc < line.source + line.length) {
            return line.destination + acc - line.source;
          }
        }

        return acc;
      }, seed);

    const step1 = Math.min(...seeds.map(locationStep1));

    const step2 = 456;

    return [step1, step2];
  }

  run() {
    const [step12, step21] = this.solve('data/day5.sample');

    console.log(`day 5 step 1: ${step12}`);
    console.log(`day 5 step 2: ${step21}`);

    const [step1, step2] = this.solve('data/day5.input');

    console.log(`day 5 step 1: ${step1}`);
    console.log(`day 5 step 2: ${step2}`);
  }
}
