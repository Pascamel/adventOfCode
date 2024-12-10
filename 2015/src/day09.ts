import { readFileSync } from 'fs';
import { IDay } from './helpers';

type Line = { from: string; to: string; distance: number };

type Trip = { stages: string[]; distance: number };

export class Day09 implements IDay {
  file: Line[] = [];

  cities() {
    const result: string[] = [];
    for (let line of this.file) {
      if (!result.includes(line.from)) {
        result.push(line.from);
      }
      if (!result.includes(line.to)) {
        result.push(line.to);
      }
    }

    return result;
  }

  process(max: boolean = false) {
    const cities = this.cities();

    let trips: Trip[] = cities.map((city) => ({
      stages: [city],
      distance: 0,
    }));

    for (let i = 1; i < cities.length; i++) {
      let newTrips: Trip[] = [];

      for (let trip of trips) {
        for (let line of this.file) {
          if (trip.stages.length < i) {
            continue;
          }
          const { stages } = trip;
          if (stages[i - 1] === line.from && !stages.includes(line.to)) {
            newTrips.push({
              stages: [...stages, line.to],
              distance: trip.distance + line.distance,
            });
          }

          if (stages[i - 1] === line.to && !stages.includes(line.from)) {
            newTrips.push({
              stages: [...stages, line.from],
              distance: trip.distance + line.distance,
            });
          }
        }
      }

      trips = newTrips;
    }

    const distances = trips
      .filter((trip) => trip.stages.length === cities.length)
      .map((trip) => trip.distance);

    return max
      ? distances.reduce((a, b) => Math.max(a, b))
      : distances.reduce((a, b) => Math.min(a, b));
  }

  solve(fileName: string) {
    this.file = readFileSync(fileName, 'utf-8')
      .split('\n')
      .map((line) => ({
        from: line.split(' = ')[0].split(' to ')[0],
        to: line.split(' = ')[0].split(' to ')[1],
        distance: parseInt(line.split(' = ')[1]),
      }));

    const result1 = this.process();
    const result2 = this.process(true);

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve('data/day09.input');

    console.log('day 09 step 1: ' + step1.toString());
    console.log('day 09 step 2: ' + step2.toString());
  }
}
