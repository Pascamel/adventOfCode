import { Day08 } from "../day08";
import { day08input, day08sample } from "../data";

test("Day 08 sample input", () => {
  const [step1, step2] = new Day08().solve(day08sample);

  expect(step1).toBe(40);
  expect(step2).toBe(25272);

  const [finale1, finale2] = new Day08().solve(day08input);

  expect(finale1).toBe(122430);
  expect(finale2).toBe(8135565324);
});
