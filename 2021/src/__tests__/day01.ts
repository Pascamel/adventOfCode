import { day01input, day01sample } from "../data";
import { Day01 } from "../day01";

test("Day 01 sample input", () => {
  const [step1, step2] = new Day01().solve(day01sample);

  expect(step1).toBe(7);
  expect(step2).toBe(5);

  const [finale1, finale2] = new Day01().solve(day01input);

  expect(finale1).toBe(1676);
  expect(finale2).toBe(1706);
});
