import { day01sample } from '../data';
import { Day01 } from '../day01';

test('Day 01 sample input', () => {
  const [step1, step2] = new Day01().solve(day01sample);

  expect(step1).toBe(-1);
  expect(step2).toBe(5);
});
