import { day05sample } from '../data';
import { Day05 } from '../day05';

test('Day 05 sample input', () => {
  const [step1, step2] = new Day05().solve(day05sample);

  expect(step1).toBe(2);
  expect(step2).toBe(0);
});
