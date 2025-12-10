import { day10input, day10sample } from "../data";
import { Day10 } from "../day10";

test("Day 10 sample input", async () => {
  const [step1, step2] = await new Day10().solve(day10sample);

  expect(step1).toBe(7);
  expect(step2).toBe(33);

  const [finale1, finale2] = await new Day10().solve(day10input);

  expect(finale1).toBe(457);
  expect(finale2).toBe(17576);
});
