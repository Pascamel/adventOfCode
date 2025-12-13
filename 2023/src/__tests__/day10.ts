import { day10input, day10sample1, day10sample2 } from "../data";
import { Day10 } from "../day10";

test("Day 10 sample input", () => {
  const [step11, step21] = new Day10().solve(day10sample1);

  expect(step11).toBe(4);
  expect(step21).toBe(1);

  const [step12, step22] = new Day10().solve(day10sample2);

  expect(step12).toBe(8);
  expect(step22).toBe(1);

  const [finale1, finale2] = new Day10().solve(day10input);

  expect(finale1).toBe(6828);
  expect(finale2).toBe(459);
});
