import { day07input, day07sample } from "../data";
import { Day07 } from "../day07";

test("Day 07 sample input", () => {
  const [step1, step2] = new Day07().solve(day07sample);

  expect(step1).toBe(6440);
  expect(step2).toBe(5905);

  const [finale1, finale2] = new Day07().solve(day07input);

  // too low
  expect(finale1).toBe(256448566);
  expect(finale2).toBe(254412181);
});
