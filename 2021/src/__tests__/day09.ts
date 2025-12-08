import { day09sample } from "../data";
import { Day09 } from "../day09";

test("Day 09 sample input", () => {
  const [step1, step2] = new Day09().solve(day09sample);

  expect(step1).toBe(15);
  expect(step2).toBe(1134);
});
