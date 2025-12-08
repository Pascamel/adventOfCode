import { day02input, day02sample } from "../data";
import { Day2 } from "../day2";

test("Day 2 sample input", () => {
  const [step1, step2] = new Day2().solve(day02sample);

  expect(step1).toBe(15);
  expect(step2).toBe(12);

  const [finale1, finale2] = new Day2().solve(day02input);

  expect(finale1).toBe(10994);
  expect(finale2).toBe(12526);
});
