import { day09sample } from "../data";
import { Day9 } from "../day9";

test("Day 9 sample input", () => {
  const [step1, step2] = new Day9().solve(day09sample);

  expect(step1).toBe(15);
  expect(step2).toBe(1134);
});
