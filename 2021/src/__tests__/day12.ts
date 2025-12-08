import { day12input, day12sample1, day12sample2, day12sample3 } from "../data";
import { Day12 } from "../day12";

test("Day 12 sample input", () => {
  const [step1_1, step2_1] = new Day12().solve(day12sample1);

  expect(step1_1).toBe(10);
  expect(step2_1).toBe(36);

  const [step1_2, step2_2] = new Day12().solve(day12sample2);

  expect(step1_2).toBe(19);
  expect(step2_2).toBe(103);

  const [step1_3, step2_3] = new Day12().solve(day12sample3);

  expect(step1_3).toBe(226);
  expect(step2_3).toBe(3509);

  const [finale1, finale2] = new Day12().solve(day12input);

  expect(finale1).toBe(5457);
  expect(finale2).toBe(128506);
});
