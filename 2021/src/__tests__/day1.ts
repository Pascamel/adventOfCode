import { day01input, day01sample } from "../data";
import { Day1 } from "../day1";

test("Day 1 sample input", () => {
  const [step1, step2] = new Day1().solve(day01sample);

  expect(step1).toBe(7);
  expect(step2).toBe(5);

  const [finale1, finale2] = new Day1().solve(day01input);

  expect(finale1).toBe(1676);
  expect(finale2).toBe(1706);
});
