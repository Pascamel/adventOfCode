import { day08input, day08sample1, day08sample2, day08sample3 } from "../data";
import { Day08 } from "../day08";

test("Day 08 sample input", () => {
  const [step11, step21] = new Day08().solve(day08sample1);

  expect(step11).toBe(2);
  expect(step21).toBe(2);

  const [step12, step22] = new Day08().solve(day08sample2);

  expect(step12).toBe(6);
  expect(step22).toBe(6);

  const [step13, step23] = new Day08().solve(day08sample3);

  expect(step13).toBe(2);
  expect(step23).toBe(6);

  const [finale1, finale2] = new Day08().solve(day08input);

  expect(finale1).toBe(21389);
  expect(finale2).toBe(21083806112641);
});
