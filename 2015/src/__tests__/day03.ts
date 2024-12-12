import { day03sample } from '../data';
import { Day03 } from '../day03';

test('Day 03 sample input', () => {
  const [step1, step2] = new Day03().solve(day03sample);

  expect(step1).toBe(4);
  expect(step2).toBe(3);
});
