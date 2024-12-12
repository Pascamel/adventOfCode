import { day10input } from '../data';
import { Day10 } from '../day10';

test('Day 10 sample input', () => {
  const [step1, step2] = new Day10().solve(day10input);

  expect(step1).toBe(252594);
  expect(step2).toBe(3579328);
});
