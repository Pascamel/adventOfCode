import { day13input, day13sample } from "../data";
import { Day13 } from "../day13";

test("Day 13 sample input", () => {
  const [test11, test21] = new Day13().solve(day13sample);
  expect(test11).toBe(480);
  expect(test21).toBe(875318608908);

  const [finale1, finale2] = new Day13().solve(day13input);
  expect(finale1).toBe(38839);
  expect(finale2).toBe(75200131617108);
});
