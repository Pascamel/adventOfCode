import { day01input, day01sample1, day01sample2 } from "../data";
import { Day01 } from "../day01";

test("Day 01 sample input", () => {
  const [step1, _step2] = new Day01().solve(day01sample1);

  expect(step1).toBe(142);

  const [_step1, step2] = new Day01().solve(day01sample2);

  expect(step2).toBe(281);

  const [finale1, finale2] = new Day01().solve(day01input);

  expect(finale1).toBe(53651);
  expect(finale2).toBe(53894);
});
