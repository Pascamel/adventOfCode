import { day05input, day05sample } from "./data";
import { IDay } from "./helpers";

export class Day05 implements IDay<number[]> {
  solve(input: string) {
    const lines = input.split("\n");
    const ranges = lines.slice(0, lines.indexOf("")).map((line) => {
      const [start, end] = line.split("-").map(Number);
      return { start, end };
    });
    const ingredients = lines.slice(lines.indexOf("") + 1).map(Number);

    // we want to sort ranges, so that "early" ranges take priority
    ranges.sort((a, b) => (a.start === b.start ? a.end - b.end : a.start - b.start));

    const step1 = ingredients.reduce((acc, ingredient) => {
      const range = ranges.find((range) => ingredient >= range.start && ingredient <= range.end);
      return acc + (range ? 1 : 0);
    }, 0);

    const step2 = ranges
      .reduce<{ start: number; end: number }[]>((acc, { start: s, end: e }, idx) => {
        // trim the new range by all previously covered ranges. discard it if it's included in another range already (hence the sorting earlier)
        for (const { start: cs, end: ce } of acc) {
          if (ce < s || cs > e) continue;

          if (cs <= s && s <= ce) s = ce + 1;
          if (cs <= e && e <= ce) e = cs - 1;

          if (s > e) break; // fully covered
        }

        if (s <= e) {
          acc.push({ start: s, end: e });
        }

        return acc;
      }, [])
      .reduce((acc, r) => acc + r.end - r.start + 1, 0);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day05input);

    console.log(`day 05 step 1: ${step1}`);
    console.log(`day 05 step 2: ${step2}`);
  }
}
