import { day08input, day08sample } from '../data';
import { Day08 } from '../day08';

test('Day 08 sample input', () => {
  const [step1s, step2s] = new Day08().solve(day08sample);

  expect(step1s).toBe(8);
  expect(step2s).toBe(17);

  const [step1, step2] = new Day08().solve(day08input);

  expect(step1).toBe(612);
  expect(step2).toBe(1586);
});
