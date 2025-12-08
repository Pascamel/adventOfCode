import { IDay } from "./helpers";
import { day12input } from "./data";

export class Day12 implements IDay {
  duplicates: Map<string, boolean>;

  constructor() {
    this.duplicates = new Map();
  }

  isSmallCave(node: string) {
    return node !== "start" && node !== "end" && node.match(/^[a-z]*$/);
  }

  hasDuplicates(array: Array<string>) {
    const key = array.sort().join("-");
    if (this.duplicates.has(key)) {
      return this.duplicates.get(key);
    }

    const valuesSoFar = Object.create(null);
    for (let i = 0; i < array.length; ++i) {
      const value = array[i];
      if (value in valuesSoFar) {
        this.duplicates.set(key, true);
        return true;
      }
      valuesSoFar[value] = true;
    }
    this.duplicates.set(key, false);
    return false;
  }

  part1(map: Map<string, Array<string>>) {
    let completePaths = new Array<Array<string>>();
    let paths = new Array<Array<string>>();
    let newPaths = (map.get("start") || []).map((node) => ["start", node]);
    let tmp = 0;

    while (newPaths.length > 0 && tmp < 50) {
      paths = newPaths;
      tmp++;

      paths.forEach((path) => {
        const lastNode = path[path.length - 1];
        const secondToLastNode = path[path.length - 2];
        const smallCaves = path.filter((node) => this.isSmallCave(node));

        (map.get(lastNode) || [])
          .filter(
            (node) => node !== secondToLastNode || this.isSmallCave(lastNode)
          )
          .filter((node) => node !== "start")
          .filter((node) => smallCaves.indexOf(node) === -1)
          .forEach((node) => {
            if (node === "end") {
              completePaths.push([...path, node]);
            } else {
              newPaths.push([...path, node]);
            }
          });
      });

      newPaths = [...new Set(newPaths.map((p) => p.join("-")))].map((p) =>
        p.split("-")
      );
    }

    return [...new Set(completePaths.map((p) => p.join("-")))].map((p) =>
      p.split("-")
    ).length;
  }

  part2(map: Map<string, Array<string>>) {
    let completePaths = new Array<Array<string>>();
    let paths = new Array<Array<string>>();
    let newPaths = (map.get("start") || []).map((node) => ["start", node]);
    let tmp = 0;

    while (newPaths.length > 0 && tmp < 16) {
      paths = newPaths;
      tmp++;

      paths.forEach((path) => {
        const lastNode = path[path.length - 1];
        const secondToLastNode = path[path.length - 2];
        const smallCaves = path.filter((node) => this.isSmallCave(node));

        (map.get(lastNode) || [])
          .filter(
            (node) =>
              node !== secondToLastNode ||
              this.isSmallCave(lastNode) ||
              this.isSmallCave(secondToLastNode)
          )
          .filter((node) => node !== "start")
          .filter(
            (node) =>
              !this.isSmallCave(node) ||
              smallCaves.indexOf(node) === -1 ||
              !this.hasDuplicates(smallCaves)
          )
          .forEach((node) => {
            if (node === "end") {
              completePaths.push([...path, node]);
            } else {
              newPaths.push([...path, node]);
            }
          });
      });

      newPaths = [...new Set(newPaths.map((p) => p.join("-")))].map((p) =>
        p.split("-")
      );
      completePaths = [...new Set(completePaths.map((p) => p.join("-")))].map(
        (p) => p.split("-")
      );
    }

    return [...new Set(completePaths.map((p) => p.join("-")))].length;
  }

  solve(input: string) {
    const lines = input.split("\n");
    const map = new Map();
    lines.forEach((path) => {
      let node = path.split("-");
      map.set(node[0], [...(map.get(node[0]) || []), node[1]]);
      map.set(node[1], [...(map.get(node[1]) || []), node[0]]);
    });

    const result1 = this.part1(map);
    const result2 = this.part2(map);

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve(day12input);

    console.log("day 12 step 1: " + step1.toString());
    console.log("day 12 step 2: " + step2.toString());
  }
}
