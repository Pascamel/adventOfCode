import { day08input, day08sample } from "../data";
import { Day8 } from "../day8";

test("Day 8 sample input", () => {
  const [step1, step2] = new Day8().solve(day08sample);

  expect(step1).toBe(21);
  expect(step2).toBe(8);

  const [finale1, finale2] = new Day8().solve(day08input);

  expect(finale1).toBe(1715);
  expect(finale2).toBe(374400);
});
