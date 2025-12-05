import { day03input, day03sample } from "../data";
import { Day03 } from "../day03";

test("Day 03 sample input", () => {
  const [step1, step2] = new Day03().solve(day03sample);

  expect(step1).toBe(357);
  expect(step2).toBe(3121910778619);

  const [finale1, finale2] = new Day03().solve(day03input);

  expect(finale1).toBe(17535);
  expect(finale2).toBe(173577199527257);
});
