import { day07input, day07sample } from "../data";
import { Day7 } from "../day7";

test("Day 7 sample input", () => {
  const [step1, step2] = new Day7().solve(day07sample);

  expect(step1).toBe(37);
  expect(step2).toBe(170);

  const [finale1, finale2] = new Day7().solve(day07input);

  expect(finale1).toBe(347011);
  expect(finale2).toBe(98363777);
});
