import { Day09 } from '../day09';

test('Day 09 sample input', () => {
  const [step1, step2] = new Day09().solve('data/day09.sample');

  expect(step1).toBe(65079);
  expect(step2).toBe(65079);
});
