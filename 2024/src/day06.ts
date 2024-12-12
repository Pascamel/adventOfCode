import { day06sample } from './data';
import { IDay } from './helpers';

enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

type Point = {
  row: number;
  col: number;
};

type Step = Point & {
  direction: Direction;
};

export class Day06 implements IDay<number[]> {
  map: string[][] = [];
  rowStart: number = 0;
  colStart: number = 0;

  turnRight(step: Step) {
    switch (step.direction) {
      case Direction.Up:
        return Direction.Right;
      case Direction.Right:
        return Direction.Down;
      case Direction.Down:
        return Direction.Left;
      case Direction.Left:
        return Direction.Up;
    }
  }

  isObstruction(point: Point, extraBlock?: Point) {
    if (this.isOutOfBound(point)) {
      return false;
    }

    if (this.map[point.row][point.col] === '#') {
      return true;
    }

    return extraBlock?.row === point.row && extraBlock?.col === point.col;
  }

  canTakeStep(step: Step, extraBlock?: Point) {
    switch (step.direction) {
      case Direction.Up:
        return !this.isObstruction({ ...step, row: step.row - 1 }, extraBlock);
      case Direction.Right:
        return !this.isObstruction({ ...step, col: step.col + 1 }, extraBlock);
      case Direction.Down:
        return !this.isObstruction({ ...step, row: step.row + 1 }, extraBlock);
      case Direction.Left:
        return !this.isObstruction({ ...step, col: step.col - 1 }, extraBlock);
    }
  }

  takeStep(step: Step) {
    switch (step.direction) {
      case Direction.Up:
        return { ...step, row: step.row - 1 };
      case Direction.Right:
        return { ...step, col: step.col + 1 };
      case Direction.Down:
        return { ...step, row: step.row + 1 };
      case Direction.Left:
        return { ...step, col: step.col - 1 };
    }
  }

  isOutOfBound(point: Point | Step) {
    return (
      point.row < 0 ||
      point.col < 0 ||
      point.row >= this.map.length ||
      point.col >= this.map[0].length
    );
  }

  countUniquePoints(visited: Step[]) {
    return visited.filter(
      (point, index) =>
        visited.findIndex((p) => p.row === point.row && p.col === point.col) ===
        index
    ).length;
  }

  hasLooped(point: Step, visited: Step[]) {
    return visited.some(
      (step) =>
        step.row === point.row &&
        step.col === point.col &&
        step.direction === point.direction
    );
  }

  walk(extraBlock?: Point) {
    let visited: Step[] = [];
    let candidates: Point[] = [];
    let isOutOfBound = false;
    let hasLooped = false;
    let current: Step = {
      row: this.rowStart,
      col: this.colStart,
      direction: Direction.Up,
    };

    while (!isOutOfBound && !hasLooped) {
      if (this.isOutOfBound(current)) {
        isOutOfBound = true;
        break;
      }
      if (this.hasLooped(current, visited)) {
        hasLooped = true;
        break;
      }

      if (this.canTakeStep(current, extraBlock)) {
        visited.push(current);

        const next = this.takeStep(current);
        const candidate = { row: next.row, col: next.col };
        if (
          !candidates.some(
            (point) => point.row === next.row && point.col === next.col
          ) &&
          !this.isOutOfBound(candidate)
        ) {
          candidates.push(candidate);
        }
        current = next;
      } else {
        current = { ...current, direction: this.turnRight(current) };
      }
    }

    return { visited, candidates, hasLooped, isOutOfBound };
  }

  solve(input: string) {
    this.map = input.split('\n').map((line) => line.split(''));
    this.rowStart = this.map.findIndex((row) => row.includes('^'));
    this.colStart = this.map[this.rowStart].findIndex((col) => col === '^');

    const { visited, candidates } = this.walk();

    const step1 = this.countUniquePoints(visited);
    const step2 = candidates.reduce(
      (acc, candidate) => acc + (this.walk(candidate).hasLooped ? 1 : 0),
      0
    );

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day06sample);

    console.log(`day 06 step 1: ${step1}`);
    console.log(`day 06 step 2: ${step2}`);
  }
}
