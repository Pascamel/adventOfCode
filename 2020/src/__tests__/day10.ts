import { day10input, day10sample1, day10sample2 } from "../data";
import { Day10 } from "../day10";

test("Day 10 sample input", () => {
  const [step11, step21] = new Day10().solve(day10sample1);

  expect(step11).toBe(35);
  expect(step21).toBe(8);

  const [step12, step22] = new Day10().solve(day10sample2);

  expect(step12).toBe(220);
  expect(step22).toBe(19208);

  const [finale1, finale2] = new Day10().solve(day10input);

  expect(finale1).toBe(1690);
  expect(finale2).toBe(5289227976704);
});
