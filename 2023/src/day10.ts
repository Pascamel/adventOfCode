import { day10sample1 } from "./data";
import { IDay } from "./helpers";

type Point = [number, number];

enum Direction {
  Up = "up",
  Left = "left",
  Down = "down",
  Right = "right",
}

type Pipe = "|" | "-" | "L" | "J" | "7" | "F";

function move(pipe: Pipe, direction: Direction): [number, number, Direction] {
  switch (pipe) {
    case "|":
      return [direction === Direction.Up ? -1 : 1, 0, direction];
    case "-":
      return [0, direction === Direction.Right ? 1 : -1, direction];
    case "L":
      return [
        direction === Direction.Down ? 0 : -1,
        direction === Direction.Down ? 1 : 0,
        direction === Direction.Down ? Direction.Right : Direction.Up,
      ];
    case "J":
      return [
        direction === Direction.Right ? -1 : 0,
        direction === Direction.Right ? 0 : -1,
        direction === Direction.Right ? Direction.Up : Direction.Left,
      ];
    case "7":
      return [
        direction === Direction.Up ? 0 : 1,
        direction === Direction.Up ? -1 : 0,
        direction === Direction.Up ? Direction.Left : Direction.Down,
      ];
    case "F":
      return [
        direction === Direction.Left ? 1 : 0,
        direction === Direction.Left ? 0 : 1,
        direction === Direction.Left ? Direction.Down : Direction.Right,
      ];
    default:
      throw new Error(`Invalid pipe: ${pipe}`);
  }
}

// https://en.wikipedia.org/wiki/Shoelace_formula
function area(vertices: Point[]): number {
  let area = 0;

  for (let i = 0; i < vertices.length; i++) {
    const nextIndex = (i + 1) % vertices.length;
    const [currentY, currentX] = vertices[i];
    const [nextY, nextX] = vertices[nextIndex];
    area += currentX * nextY - currentY * nextX;
  }

  area = Math.abs(area) / 2;

  return area;
}

export class Day10 implements IDay<number[]> {
  solve(input: string) {
    const data = input.split("\n");
    const row = data.findIndex((row) => row.includes("S"));
    const col = data[row].indexOf("S");
    const path: Point[] = [[row, col]];
    let vertices: Point[] = [];
    let point: Point = [row, col];
    let direction = Direction.Down;
    let firstDirection = Direction.Down;
    let length = 1;

    // down or right is 1, up or left is -1
    if (data[row - 1][col] && ["7", "F", "|"].includes(data[row - 1][col])) {
      point = [row - 1, col];
      direction = Direction.Up;
      firstDirection = Direction.Up;
    } else if (data[row + 1][col] && ["J", "L", "|"].includes(data[row + 1][col])) {
      point = [row + 1, col];
      direction = Direction.Down;
      firstDirection = Direction.Down;
    } else if (data[row][col - 1] && ["F", "L", "-"].includes(data[row][col - 1])) {
      point = [row, col - 1];
      direction = Direction.Left;
      firstDirection = Direction.Left;
    } else if (data[row][col + 1] && ["J", "7", "-"].includes(data[row][col + 1])) {
      point = [row, col + 1];
      direction = Direction.Right;
      firstDirection = Direction.Right;
    } else {
      throw new Error(`Invalid starting position: ${data[row][col]}`);
    }

    while (data[point[0]][point[1]] !== "S") {
      if (["F", "7", "L", "J"].includes(data[point[0]][point[1]])) {
        vertices.push([...point]);
      }
      path.push([...point]);
      const [row, col, d] = move(data[point[0]][point[1]] as Pipe, direction);
      point[0] = point[0] + row;
      point[1] = point[1] + col;
      direction = d as Direction;
      length++;
    }

    // S might be a vertice: if so, add it to the vertices array
    const rows = data.findIndex((row) => row.includes("S"));
    const cols = data[row].indexOf("S");
    if (firstDirection === Direction.Right || firstDirection === Direction.Left) {
      if (direction === Direction.Up || direction === Direction.Down) {
        vertices = [[rows, cols], ...vertices];
      }
    }
    if (firstDirection === Direction.Up || firstDirection === Direction.Down) {
      if (direction === Direction.Right || direction === Direction.Left) {
        vertices = [[rows, cols], ...vertices];
      }
    }

    const step1 = length / 2;
    const step2 = area(vertices) - path.length / 2 + 1;

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day10sample1);

    console.log(`day 10 step 1: ${step1}`);
    console.log(`day 10 step 2: ${step2}`);
  }
}
