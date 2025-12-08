import { day02input } from "../data";
import { Day02 } from "../day02";

test("Day 2 sample input", () => {
  const [finale1, finale2] = new Day02().solve(day02input);

  expect(finale1).toBe(3716250);
  expect(finale2).toBe(6472);
});
