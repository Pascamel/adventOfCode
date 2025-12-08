import { readFileSync } from "fs";
import { IDay } from "./helpers";
import { day05input } from "./data";

type Point = {
  x: number;
  y: number;
};

type Line = {
  start: Point;
  end: Point;
};

export class Day05 implements IDay {
  part1 = (input: Array<Line>) => {
    const map1 = new Map();
    input
      .filter((l) => l.start.x === l.end.x || l.start.y === l.end.y)
      .forEach((line) => {
        if (line.start.x === line.end.x) {
          for (let i = line.start.y; i <= line.end.y; i++) {
            const key = line.start.x + "-" + i;
            map1.set(key, (map1.get(key) || 0) + 1);
          }
        } else {
          for (let i = line.start.x; i <= line.end.x; i++) {
            const key = i + "-" + line.start.y;
            map1.set(key, (map1.get(key) || 0) + 1);
          }
        }
      });

    return Array.from(map1.entries()).filter(([_, value]) => value > 1).length;
  };

  part2 = (input: Array<Line>) => {
    const map2 = new Map();
    input
      .filter(
        (l) =>
          l.start.x === l.end.x ||
          l.start.y === l.end.y ||
          Math.abs(l.end.x - l.start.x) === Math.abs(l.end.y - l.start.y)
      )
      .forEach((line) => {
        if (line.start.x === line.end.x) {
          for (let i = line.start.y; i <= line.end.y; i++) {
            const key = line.start.x + "-" + i;
            map2.set(key, (map2.get(key) || 0) + 1);
          }
        } else if (line.start.y === line.end.y) {
          for (let i = line.start.x; i <= line.end.x; i++) {
            const key = i + "-" + line.start.y;
            map2.set(key, (map2.get(key) || 0) + 1);
          }
        } else {
          const factor = line.start.y > line.end.y ? -1 : 1;
          for (let i = 0; i <= line.end.x - line.start.x; i++) {
            const key = line.start.x + i + "-" + (line.start.y + factor * i);
            map2.set(key, (map2.get(key) || 0) + 1);
          }
        }
      });

    return Array.from(map2.entries()).filter(([_, value]) => value > 1).length;
  };

  solve(input_: string) {
    const input = input_.split("\n").map((line) => {
      const parts = line.split(" -> ").map((point) => ({
        x: parseInt(point.split(",")[0]),
        y: parseInt(point.split(",")[1]),
      }));
      parts.sort((p1, p2) => {
        if (p1.x === p2.x) return p1.y - p2.y;
        if (p1.y === p2.y) return p1.x - p2.x;

        return p1.x - p2.x;
      });
      return {
        start: parts[0],
        end: parts[1],
      };
    });

    const result1 = this.part1(input);
    const result2 = this.part2(input);

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve(day05input);

    console.log("day 05 step 1: " + step1.toString());
    console.log("day 05 step 2: " + step2.toString());
  }
}
