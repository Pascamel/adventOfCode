import { day08sample } from "./data";
import { IDay } from "./helpers";

type Point3D = { x: number; y: number; z: number };

function distance3D(a: Point3D, b: Point3D): number {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2 + (b.z - a.z) ** 2);
}

function pairsSorted(points: Point3D[]) {
  const allPairs: { i: number; j: number; dist: number }[] = [];

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      allPairs.push({
        i,
        j,
        dist: distance3D(points[i], points[j]),
      });
    }
  }

  allPairs.sort((a, b) => a.dist - b.dist);

  return allPairs;
}

function connect(i: number, j: number, circuits: number[][]) {
  const circuit1 = circuits.findIndex((circuit) => circuit.includes(i));
  const circuit2 = circuits.findIndex((circuit) => circuit.includes(j));

  if (circuit1 === -1 && circuit2 === -1) {
    circuits.push([i, j]);
  } else if (circuit1 === -1) {
    circuits[circuit2].push(i);
  } else if (circuit2 === -1) {
    circuits[circuit1].push(j);
  } else if (circuit1 !== circuit2) {
    circuits[circuit1].push(...circuits[circuit2]);
    circuits.splice(circuit2, 1);
  }

  return circuits;
}

export class Day08 implements IDay<number[]> {
  solve(input: string) {
    const lines = input
      .split("\n")
      .map((line) => line.split(",").map(Number))
      .map(([x, y, z]) => ({ x, y, z }));

    // part 1
    const test = pairsSorted(lines);
    const circuits: number[][] = [];

    for (const { i, j } of test.slice(0, lines.length < 50 ? 10 : 1000)) {
      connect(i, j, circuits);
    }

    circuits.sort((a, b) => b.length - a.length);
    const step1 = circuits[0].length * circuits[1].length * circuits[2].length;

    // part 2

    const circuits2: number[][] = [];
    let step2 = 0;

    for (const { i, j } of test) {
      connect(i, j, circuits2);

      if (circuits2.length === 1 && circuits2[0].length === lines.length) {
        step2 = lines[i].x * lines[j].x;

        break;
      }
    }

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day08sample);

    console.log(`day 08 step 1: ${step1}`);
    console.log(`day 08 step 2: ${step2}`);
  }
}
