import { day15input } from '../data';
import { Day15 } from '../day15';

test('Day 15 sample input', () => {
  const [step1, step2] = new Day15().solve(day15input);

  expect(step1).toBe(222870);
  expect(step2).toBe(117936);
});
