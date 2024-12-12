import { day09input, day09sample } from '../data';
import { Day09 } from '../day09';

test('Day 09 sample input', () => {
  const [step1s, step2s] = new Day09().solve(day09sample);

  expect(step1s).toBe(605);
  expect(step2s).toBe(982);

  const [step1, step2] = new Day09().solve(day09input);

  expect(step1).toBe(251);
  expect(step2).toBe(898);
});
