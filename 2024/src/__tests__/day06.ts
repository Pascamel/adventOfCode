import { day06input, day06sample } from '../data';
import { Day06 } from '../day06';

test('Day 6 sample input', () => {
  const [step1, step2] = new Day06().solve(day06sample);

  expect(step1).toBe(41);
  expect(step2).toBe(6);

  const [finale1, finale2] = new Day06().solve(day06input);

  expect(finale1).toBe(4580);
  expect(finale2).toBe(1480);
});
