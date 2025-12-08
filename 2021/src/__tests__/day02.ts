import { day02sample, day02input } from "../data";
import { Day02 } from "../day02";

test("Day 02 sample input", () => {
  const [step1, step2] = new Day02().solve(day02sample);

  expect(step1).toBe(150);
  expect(step2).toBe(900);

  const [finale1, finale2] = new Day02().solve(day02input);

  expect(finale1).toBe(2027977);
  expect(finale2).toBe(1903644897);
});
