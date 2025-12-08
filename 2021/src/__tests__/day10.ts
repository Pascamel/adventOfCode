import { day10input, day10sample } from "../data";
import { Day10 } from "../day10";

test("Day 10 sample input", () => {
  const [step1, step2] = new Day10().solve(day10sample);

  expect(step1).toBe(26397);
  expect(step2).toBe(288957);

  const [finale1, finale2] = new Day10().solve(day10input);

  expect(finale1).toBe(166191);
  expect(finale2).toBe(1152088313);
});
