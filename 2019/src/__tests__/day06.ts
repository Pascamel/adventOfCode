import { day06input, day06sample } from "../data";
import { Day06 } from "../day06";

test("Day 06 sample input", () => {
  const [step1, step2] = new Day06().solve(day06sample);

  expect(step1).toBe(42);
  expect(step2).toBe(4);

  const [finale1, finale2] = new Day06().solve(day06input);

  expect(finale1).toBe(145250);
  expect(finale2).toBe(274);
});
