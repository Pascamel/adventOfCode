import { day13input, day13sample } from "../data";
import { Day13 } from "../day13";

test("Day 13 sample input", () => {
  const [step1, step2] = new Day13().solve(day13sample);

  expect(step1).toBe(17);
  expect(step2).toBe(456);

  const [finale1, finale2] = new Day13().solve(day13input);

  expect(finale1).toBe(712);
  expect(finale2).toBe(456);
});
