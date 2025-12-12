import { day12input, day12sample } from "../data";
import { Day12 } from "../day12";

test("Day 12 sample input", () => {
  const [step1, _] = new Day12().solve(day12sample);

  expect(step1).toBe(0);

  const [finale1, __] = new Day12().solve(day12input);

  expect(finale1).toBe(497);
});
