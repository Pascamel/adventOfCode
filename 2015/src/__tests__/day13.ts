import { day13input, day13sample } from '../data';
import { Day13 } from '../day13';

test('Day 13 sample input', () => {
  const [step1s, step2s] = new Day13().solve(day13sample);

  expect(step1s).toBe(330);
  expect(step2s).toBe(286);

  const [step1, step2] = new Day13().solve(day13input);

  expect(step1).toBe(709);
  expect(step2).toBe(668);
});
