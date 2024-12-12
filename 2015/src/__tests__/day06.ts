import { day06sample } from '../data';
import { Day06 } from '../day06';

test('Day 06 sample input', () => {
  const [step1, step2] = new Day06().solve(day06sample);

  expect(step1).toBe(998996);
  expect(step2).toBe(1001996);
});
