import { day04input, day04sample } from "../data";
import { Day04 } from "../day04";

test("Day 4 sample input", () => {
  const [step1, step2] = new Day04().solve(day04sample);

  expect(step1).toBe(13);
  expect(step2).toBe(43);

  const [finale1, finale2] = new Day04().solve(day04input);

  expect(finale1).toBe(1478);
  expect(finale2).toBe(9120);
});
