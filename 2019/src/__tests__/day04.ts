import { day04input } from "../data";
import { Day04 } from "../day04";

test("Day 04 sample input", () => {
  const [finale1, finale2] = new Day04().solve(day04input);

  expect(finale1).toBe(544);
  expect(finale2).toBe(334);
});
