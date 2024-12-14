import { day14input, day14sample } from "../data";
import { Day14 } from "../day14";

test("Day 14 sample input", () => {
  const [test11, test21] = new Day14().solve(day14sample);
  expect(test11).toBe(140);
  expect(test21).toBe(80);

  const [finale1, finale2] = new Day14().solve(day14input);
  expect(finale1).toBe(1450816);
  expect(finale2).toBe(865662);
});
