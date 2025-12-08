import { day09input, day09sample1, day09sample2 } from "../data";
import { Day9 } from "../day9";

test("Day 9 sample input", () => {
  const [step1, _2] = new Day9().solve(day09sample1);
  const [_1, step2] = new Day9().solve(day09sample2);

  expect(step1).toBe(13);
  expect(step2).toBe(36);

  const [finale1, finale2] = new Day9().solve(day09input);

  expect(finale1).toBe(6367);
  expect(finale2).toBe(2536);
});
