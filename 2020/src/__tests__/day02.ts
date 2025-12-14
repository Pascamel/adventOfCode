import { day02sample, day02input } from "../data";
import { Day02 } from "../day02";

test("Day 02 sample input", () => {
  const [step1, step2] = new Day02().solve(day02sample);

  expect(step1).toBe(2);
  expect(step2).toBe(1);

  const [finale1, finale2] = new Day02().solve(day02input);

  expect(finale1).toBe(396);
  expect(finale2).toBe(428);
});
