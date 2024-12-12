import { day09input, day09sample } from '../data';
import { Day09 } from '../day09';

test('Day 9 sample input', () => {
  const [step1, step2] = new Day09().solve(day09sample);

  expect(step1).toBe(2351);
  expect(step2).toBe(3156);

  const [finale1, finale2] = new Day09().solve(day09input);

  expect(finale1).toBe(6382875730645);
  expect(finale2).toBe(6420913943576);
});
