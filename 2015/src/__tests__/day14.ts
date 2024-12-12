import { day14input, day14sample } from '../data';
import { Day14 } from '../day14';

test('Day 14 sample input', () => {
  const [step1s, step2s] = new Day14().solve(day14sample);

  expect(step1s).toBe(2660);
  expect(step2s).toBe(1564);

  const [step1, step2] = new Day14().solve(day14input);

  expect(step1).toBe(2696);
  expect(step2).toBe(1084);
});
