import { day03input } from "../data";
import { Day03 } from "../day03";

test("Day 3 sample input", () => {
  const [finale1, finale2] = new Day03().solve(day03input);

  expect(finale1).toBe(860);
  expect(finale2).toBe(9238);
});
