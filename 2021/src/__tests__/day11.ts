import { day11input, day11sample } from "../data";
import { Day11 } from "../day11";

test("Day 11 sample input", () => {
  const [step1, step2] = new Day11().solve(day11sample);

  expect(step1).toBe(1656);
  expect(step2).toBe(195);

  const [finale1, finale2] = new Day11().solve(day11input);

  expect(finale1).toBe(1546);
  expect(finale2).toBe(471);
});
