import { day05input } from "../data";
import { Day05 } from "../day05";

test("Day 5 sample input", () => {
  const [finale1, finale2] = new Day05().solve(day05input);

  expect(finale1).toBe(7157989);
  expect(finale2).toBe(7873292);
});
