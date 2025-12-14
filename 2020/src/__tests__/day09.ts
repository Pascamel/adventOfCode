import { day09input, day09sample } from "../data";
import { Day09 } from "../day09";

test("Day 09 sample input", () => {
  const [step1, step2] = new Day09().solve(day09sample);

  expect(step1).toBe(127);
  expect(step2).toBe(62);

  const [finale1, finale2] = new Day09().solve(day09input);

  expect(finale1).toBe(257342611);
  expect(finale2).toBe(35602097);
});
