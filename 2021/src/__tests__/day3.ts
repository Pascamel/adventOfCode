import { day03input, day03sample } from "../data";
import { Day3 } from "../day3";

test("Day 3 sample input", () => {
  const [step1, step2] = new Day3().solve(day03sample);

  expect(step1).toBe(198);
  expect(step2).toBe(230);

  const [finale1, finale2] = new Day3().solve(day03input);

  expect(finale1).toBe(4006064);
  expect(finale2).toBe(5941884);
});
