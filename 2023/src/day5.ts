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

    const lines = readFileSync(fileName).toString();
    const [_seedsStr, ...convertersSrt]: Array<string> =
      lines.match(/[^:]+(\d)/g) || [];

    // seeds maps
    const seedsMap = seeds
      .map((v, i) => (i % 2 === 0 ? [v, v + seeds[i + 1] - 1, -1] : null))
      .filter((val) => val);

    // using new format for maps
    const maps2 = maps.map((map) =>
      map.map((line) => [
        line.source,
        line.source + line.length - 1,
        line.destination - line.source,
      ])
    );

    // black magic
    let candidateSeeds: number[] = [];
    seedLoop: while (seedsMap.length > 0) {
      let [seedMin, seedMax, depth] = seedsMap.pop()!;

      if (depth === maps2.length - 1) {
        candidateSeeds.push(seedMin);
        continue seedLoop;
      }

      for (const [sourceMin, sourceMax, diff] of maps2[depth + 1]) {
        if (seedMin <= sourceMax && sourceMin <= seedMax) {
          const intersect: number[] = [
            Math.max(seedMin, sourceMin),
            Math.min(seedMax, sourceMax),
          ];
          seedsMap.push([intersect[0] + diff, intersect[1] + diff, depth + 1]);

          if (seedMin < intersect[0]) {
            seedsMap.push([seedMin, intersect[0] - 1, depth]);
          }

          if (seedMax > intersect[1]) {
            seedsMap.push([intersect[1] + 1, seedMax, depth]);
          }

          continue seedLoop;
        }
      }

      if (!candidateSeeds.includes(seedMin)) {
        seedsMap.push([seedMin, seedMax, depth + 1]);
      }
    }

    const step2 = Math.min(...candidateSeeds);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day5.input');

    console.log(`day 5 step 1: ${step1}`);
    console.log(`day 5 step 2: ${step2}`);
  }
}
