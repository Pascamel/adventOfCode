import { day15input, day15sample1, day15sample2 } from "../data";
import { Day15 } from "../day15";

test("Day 15 sample input", () => {
  const [step11, step21] = new Day15().solve(day15sample1);
  expect(step11).toBe(2028);
  expect(step21).toBe(2);

  const [step12, step22] = new Day15().solve(day15sample2);
  expect(step12).toBe(10092);
  expect(step22).toBe(13);

  const [finale1, finale2] = new Day15().solve(day15input);
  expect(finale1).toBe(624);
  expect(finale2).toBe(1483);
});
