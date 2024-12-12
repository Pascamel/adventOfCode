import { day01input, day01sample } from '../data';
import { Day01 } from '../day01';

test('Day 1 sample input', () => {
  const [step1, step2] = new Day01().solve(day01sample);

  expect(step1).toBe(11);
  expect(step2).toBe(31);

  const [finale1, finale2] = new Day01().solve(day01input);

  expect(finale1).toBe(1651298);
  expect(finale2).toBe(21306195);
});
