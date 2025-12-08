import { day04input, day04sample } from "../data";
import { Day4 } from "../day4";

test("Day 4 sample input", () => {
  const [step1, step2] = new Day4().solve(day04sample);

  expect(step1).toBe(2);
  expect(step2).toBe(4);

  const [finale1, finale2] = new Day4().solve(day04input);

  expect(finale1).toBe(424);
  expect(finale2).toBe(804);
});
