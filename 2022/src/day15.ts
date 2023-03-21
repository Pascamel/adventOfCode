import { IDay } from './helpers';
import { readFileSync } from 'fs';

interface Point {
  x: number;
  y: number;
}

interface Line {
  sensor: Point;
  beacon: Point;
}

type File = Array<Line>;

export class Day15 implements IDay<string[]> {
  solve(fileName: string) {
    const file: File = readFileSync(fileName, 'utf-8')
      .split('\n')
      .map((l) => ({
        sensor: {
          x: parseInt(l.split(',')[0].split('=')[1]),
          y: parseInt(l.split('y=')[1].split(':')[0]),
        },
        beacon: {
          x: parseInt(l.split('is at x=')[1].split(',')[0]),
          y: parseInt(l.split(', y=')[2]),
        },
      }));

    const step1 = this.step1(file);
    const step2 = this.step2(file);

    return [step1, step2];
  }

  step1(file: File) {
    const helper = (row: number, file: File) => {
      const result = new Map<number, string>();

      for (let { beacon, sensor } of file) {
        const dx = Math.abs(beacon.x - sensor.x);
        const dy = Math.abs(beacon.y - sensor.y);
        const drow = Math.abs(row - sensor.y);

        for (let i = 0; i <= dx + dy - drow; i++) {
          result.set(sensor.x + i, '#');
          result.set(sensor.x - i, '#');
        }
      }

      for (let { sensor, beacon } of file) {
        if (sensor.y === row) {
          result.set(sensor.x, 'S');
        }
        if (beacon.y === row) {
          result.set(beacon.x, 'B');
        }
      }

      return Array.from(result.values()).filter((v) => v === '#').length;
    };

    return `10=${helper(10, file)}, 2000000=${helper(2000000, file)}`;
  }

  step2(file: File) {
    const sensors = file.map((line) => line.sensor);
    const beacons = file.map((line) => line.beacon);

    let b = 0;
    let y = 4000000;
    for (let row = 0; row <= y; row++) {
      let ranges = [];
      for (let s of sensors) {
        let r = Math.abs(beacons[b].x - s.x) + Math.abs(beacons[b].y - s.y);
        let distance = Math.abs(s.y - row);

        if (distance <= r) {
          let minX = Math.max(0, s.x - (r - distance));
          let maxX = Math.min(y, s.x + (r - distance));

          if (ranges.length === 0) {
            ranges.push([minX, maxX]);
          } else {
            let c = [minX, maxX];
            for (let i = ranges.length - 1; i >= 0; i--) {
              if (c[0] <= ranges[i][1] && ranges[i][0] <= c[1]) {
                c[0] = Math.min(c[0], ranges[i][0]);
                c[1] = Math.max(c[1], ranges[i][1]);
                ranges.splice(i, 1);
              }
            }
            ranges.push(c);
          }
        }
        b++;
      }

      b = 0;

      if (!(ranges[0][0] === 0 && ranges[0][1] === y)) {
        if (ranges.length < 2) {
          return '0';
        }

        let result = (ranges[1][1] + 1) * 4000000 + row;
        return `${result}`;
      }
    }

    return '0';
  }

  run() {
    const [step1, step2] = this.solve('data/day15.input');

    console.log(`day 15 step 1: ${step1}`);
    console.log(`day 15 step 2: ${step2}`);
  }
}
