import { day05input, day05sample } from "../data";
import { Day05 } from "../day05";

test("Day 05 sample input", () => {
  const [step1, step2] = new Day05().solve(day05sample);

  expect(step1).toBe(820);
  expect(step2).toBe(120);

  const [finale1, finale2] = new Day05().solve(day05input);

  expect(finale1).toBe(822);
  expect(finale2).toBe(705);
});
