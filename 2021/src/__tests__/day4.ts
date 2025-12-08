import { day04sample, day04input } from "../data";
import { Day4 } from "../day4";

test("Day 4 sample input", () => {
  const [step1, step2] = new Day4().solve(day04sample);

  expect(step1).toBe(4512);
  expect(step2).toBe(1924);

  const [finale1, finale2] = new Day4().solve(day04input);

  expect(finale1).toBe(58412);
  expect(finale2).toBe(10030);
});
