import { day17input, day17sample } from "../data";
import { Day17 } from "../day17";

test("Day 17 sample input", () => {
  const [step1s, step2s] = new Day17().solve(day17sample);

  expect(step1s).toBe(4);
  expect(step2s).toBe(3);

  const [step1, step2] = new Day17().solve(day17input);

  expect(step1).toBe(4372);
  expect(step2).toBe(4);
});
