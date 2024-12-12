import { day12input } from './data';
import { IDay } from './helpers';

type Point = { row: number; col: number };

export class Day12 implements IDay<number[]> {
  areAdjacents(p1: Point, p2: Point) {
    return Math.abs(p1.row - p2.row) + Math.abs(p1.col - p2.col) === 1;
  }

  isAdjacentRegion(point: Point, points: Point[]) {
    return points.some((p) => this.areAdjacents(p, point));
  }

  areaRegion(region: Point[]) {
    return region.length;
  }

  fencingRegion(region: Point[]) {
    return region.reduce(
      (acc, point) =>
        acc + 4 - region.filter((p) => this.areAdjacents(p, point)).length,
      0
    );
  }

  sidesRegion(region: Point[]) {
    const n: Point[] = [];
    const s: Point[] = [];
    const w: Point[] = [];
    const e: Point[] = [];

    for (let point of region) {
      if (!region.some((p) => p.row === point.row - 1 && p.col === point.col)) {
        n.push({ row: point.row, col: point.col });
      }
      if (!region.some((p) => p.row === point.row + 1 && p.col === point.col)) {
        s.push({ row: point.row + 1, col: point.col });
      }
      if (!region.some((p) => p.row === point.row && p.col === point.col - 1)) {
        w.push({ row: point.row, col: point.col });
      }
      if (!region.some((p) => p.row === point.row && p.col === point.col + 1)) {
        e.push({ row: point.row, col: point.col + 1 });
      }
    }

    // horizontal neighbors?
    const h = (a: Point, b: Point) => b.row === a.row && b.col === a.col + 1;

    n.sort((a, b) => (a.row === b.row ? a.col - b.col : a.row - b.row));
    const countTop = n.reduce(
      (acc, p, i) => acc + (i === 0 ? 1 : h(n[i - 1], p) ? 0 : 1),
      0
    );

    s.sort((a, b) => (a.row === b.row ? a.col - b.col : a.row - b.row));
    const countSouth = s.reduce(
      (acc, p, i) => acc + (i === 0 ? 1 : h(s[i - 1], p) ? 0 : 1),
      0
    );

    // vertical neighbords?
    const v = (a: Point, b: Point) => b.col === a.col && b.row === a.row + 1;

    w.sort((a, b) => (a.col === b.col ? a.row - b.row : a.col - b.col));
    const countWest = w.reduce(
      (acc, p, i) => acc + (i === 0 ? 1 : v(w[i - 1], p) ? 0 : 1),
      0
    );

    e.sort((a, b) => (a.col === b.col ? a.row - b.row : a.col - b.col));
    const countEast = e.reduce(
      (acc, p, i) => acc + (i === 0 ? 1 : v(e[i - 1], p) ? 0 : 1),
      0
    );

    return countTop + countSouth + countWest + countEast;
  }

  cost1(region: Point[]) {
    return this.areaRegion(region) * this.fencingRegion(region);
  }

  cost2(region: Point[]) {
    return this.areaRegion(region) * this.sidesRegion(region);
  }

  getRegions(input: string) {
    const data = input.split('\n').map((line) => line.split(''));

    // building the list of points containing a given letter
    const seed = new Map<string, Point[]>();
    for (let row = 0; row < data.length; row++) {
      for (let col = 0; col < data[row].length; col++) {
        const letter = data[row][col];

        if (!seed.has(letter)) {
          seed.set(letter, []);
        }
        seed.get(letter)?.push({ row, col });
      }
    }

    const result = [] as Point[][];

    // building the list of regions for each letter
    for (let key of seed.keys()) {
      const regions: Point[][] = [];
      const points = seed.get(key)!;

      while (points.length > 0) {
        const region = [points.pop()!];

        let found = true;
        while (found) {
          found = false;

          for (let point of region) {
            const search = points.findIndex((p) =>
              this.isAdjacentRegion(p, region)
            );
            if (search !== -1) {
              found = true;
              region.push(points.splice(search, 1)[0]);
            }
          }
        }

        regions.push(region);
      }

      result.push(...regions);
    }

    return result;
  }

  solve(input: string) {
    const regions = this.getRegions(input);

    const step1 = regions.reduce((acc, region) => acc + this.cost1(region), 0);
    const step2 = regions.reduce((acc, region) => acc + this.cost2(region), 0);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day12input);

    console.log(`day 12 step 1: ${step1}`);
    console.log(`day 12 step 2: ${step2}`);
  }
}
