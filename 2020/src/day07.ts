import { day07sample1 } from "./data";
import { IDay } from "./helpers";

export class Day07 implements IDay {
  loadFile(input: string) {
    const result: { [bag: string]: { [contains: string]: number } } = {};

    input.split("\n").forEach((line) => {
      const [container, contents] = line.split(" bags contain ");

      const contentsBags: Record<string, number> = {};
      if (!contents.startsWith("no other bags")) {
        contents.split(", ").forEach((content) => {
          const match = content.match(/^(\d+) (.+?) bag/);
          const [, count, bag] = match!;

          contentsBags[bag] = parseInt(count, 10);
        });
      }

      result[container] = contentsBags;
    });

    return result;
  }

  part1(lines: { [bag: string]: { [contains: string]: number } }) {
    const result = new Map<string, boolean>();

    function helper(bag: string): boolean {
      if (result.has(bag)) {
        return result.get(bag)!;
      }

      if (Object.keys(lines[bag]).length === 0) {
        result.set(bag, false);
        return false;
      }

      return Object.keys(lines[bag]).some(
        (key) => helper(key) || key === "shiny gold"
      );
    }

    return Object.keys(lines).filter((key) => helper(key)).length;
  }

  part2(lines: { [bag: string]: { [contains: string]: number } }) {
    const result = new Map<string, number>();

    function helper(bag: string): number {
      if (result.has(bag)) {
        return result.get(bag)!;
      }

      if (Object.keys(lines[bag]).length === 0) {
        result.set(bag, 0);
        return 0;
      }

      const sum = Object.keys(lines[bag]).reduce(
        (acc, key) => acc + lines[bag][key] * (1 + helper(key)),
        0
      );

      result.set(bag, sum);
      return sum;
    }

    return helper("shiny gold");
  }

  solve(input: string) {
    const lines = this.loadFile(input);

    const step1 = this.part1(lines);
    const step2 = this.part2(lines);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day07sample1);

    console.log(`day 07 step 1: ${step1}`);
    console.log(`day 07 step 2: ${step2}`);
  }
}
