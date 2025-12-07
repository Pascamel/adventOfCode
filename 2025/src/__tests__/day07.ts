import { day07input, day07sample } from "../data";
import { Day07 } from "../day07";

test("Day 07 sample input", () => {
  const [step1, step2] = new Day07().solve(day07sample);

  expect(step1).toBe(21);
  expect(step2).toBe(40);

  const [finale1, finale2] = new Day07().solve(day07input);

  expect(finale1).toBe(1615);
  expect(finale2).toBe(43560947406326);
});
