import { day14input, day14sample } from "../data";
import { Day14 } from "../day14";

test("Day 14 sample input", () => {
  const [step1, step2] = new Day14().solve(day14sample);

  expect(step1).toBe(24);
  expect(step2).toBe(93);

  const [finale1, finale2] = new Day14().solve(day14input);

  expect(finale1).toBe(1061);
  expect(finale2).toBe(25055);
});
