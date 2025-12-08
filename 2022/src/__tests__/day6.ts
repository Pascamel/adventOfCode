import {
  day06input,
  day06sample1,
  day06sample2,
  day06sample3,
  day06sample4,
  day06sample5,
} from "../data";
import { Day6 } from "../day6";

test("Day 6 sample input", () => {
  const [step1_1, step2_1] = new Day6().solve(day06sample1);

  expect(step1_1).toBe(7);
  expect(step2_1).toBe(19);

  const [step1_2, step2_2] = new Day6().solve(day06sample2);

  expect(step1_2).toBe(5);
  expect(step2_2).toBe(23);

  const [step1_3, step2_3] = new Day6().solve(day06sample3);

  expect(step1_3).toBe(6);
  expect(step2_3).toBe(23);

  const [step1_4, step2_4] = new Day6().solve(day06sample4);

  expect(step1_4).toBe(10);
  expect(step2_4).toBe(29);

  const [step1_5, step2_5] = new Day6().solve(day06sample5);

  expect(step1_5).toBe(11);
  expect(step2_5).toBe(26);

  const [finale1, finale2] = new Day6().solve(day06input);

  expect(finale1).toBe(1655);
  expect(finale2).toBe(2665);
});
