import { day07input, day07sample1, day07sample2 } from "../data";
import { Day07 } from "../day07";

test("Day 07 sample input", () => {
  const [step1, step2] = new Day07().solve(day07sample1);

  expect(step1).toBe(4);
  expect(step2).toBe(32);

  const [step12, step22] = new Day07().solve(day07sample2);

  expect(step12).toBe(0);
  expect(step22).toBe(126);

  const [finale1, finale2] = new Day07().solve(day07input);

  expect(finale1).toBe(259);
  expect(finale2).toBe(45018);
});
