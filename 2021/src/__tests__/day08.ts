import { day08input, day08sample } from "../data";
import { Day08 } from "../day08";

test("Day 08 sample input", () => {
  const [step1, step2] = new Day08().solve(day08sample);

  expect(step1).toBe(26);
  expect(step2).toBe(61229);

  const [finale1, finale2] = new Day08().solve(day08input);

  expect(finale1).toBe(397);
  expect(finale2).toBe(1027422);
});
