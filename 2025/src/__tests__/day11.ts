import { day11input, day11sample1, day11sample2 } from "../data";
import { Day11 } from "../day11";

test("Day 11 sample input", () => {
  const [step11, step21] = new Day11().solve(day11sample1);

  expect(step11).toBe(5);
  expect(step21).toBe(0);

  const [step12, step22] = new Day11().solve(day11sample2);

  expect(step12).toBe(0);
  expect(step22).toBe(2);

  const [finale1, finale2] = new Day11().solve(day11input);

  expect(finale1).toBe(696);
  expect(finale2).toBe(473741288064360);
});
