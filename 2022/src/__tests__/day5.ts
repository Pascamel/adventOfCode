import { day05input, day05sample } from "../data";
import { Day5 } from "../day5";

test("Day 5 sample input", () => {
  const [step1, step2] = new Day5().solve(day05sample);

  expect(step1).toBe("CMZ");
  expect(step2).toBe("MCD");

  const [finale1, finale2] = new Day5().solve(day05input);

  expect(finale1).toBe("HNSNMTLHQ");
  expect(finale2).toBe("RNLFDJMCT");
});
