import { day16input, day16sample } from "../data";
import { Day16 } from "../day16";

test("Day 16 sample input", () => {
  const [step1, step2] = new Day16().solve(day16sample);

  expect(step1).toBe(123);
  expect(step2).toBe(456);

  const [finale1, finale2] = new Day16().solve(day16input);

  expect(finale1).toBe(123);
  expect(finale2).toBe(456);
});
