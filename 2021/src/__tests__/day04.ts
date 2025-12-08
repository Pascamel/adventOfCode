import { day04sample, day04input } from "../data";
import { Day04 } from "../day04";

test("Day 04 sample input", () => {
  const [step1, step2] = new Day04().solve(day04sample);

  expect(step1).toBe(4512);
  expect(step2).toBe(1924);

  const [finale1, finale2] = new Day04().solve(day04input);

  expect(finale1).toBe(58412);
  expect(finale2).toBe(10030);
});
