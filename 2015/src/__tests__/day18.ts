import { day18input, day18sample } from '../data';
import { Day18 } from '../day18';

test('Day 18 sample input', () => {
  const [step1s, step2s] = new Day18().solve(day18sample);

  expect(step1s).toBe(4);
  expect(step2s).toBe(7);

  const [step1, step2] = new Day18().solve(day18input);

  expect(step1).toBe(814);
  expect(step2).toBe(924);
});
