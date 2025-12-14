import { day03input, day03sample } from "../data";
import { Day03 } from "../day03";

test("Day 03 sample input", () => {
  const [step1, step2] = new Day03().solve(day03sample);

  expect(step1).toBe(7);
  expect(step2).toBe(336);

  const [finale1, finale2] = new Day03().solve(day03input);

  expect(finale1).toBe(191);
  expect(finale2).toBe(1478615040);
});
