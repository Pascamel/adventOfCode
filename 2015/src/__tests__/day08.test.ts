import { Day08 } from '../day08';

test('Day 08 sample input', () => {
  const [step1, step2] = new Day08().solve('data/day08.sample');

  expect(step1).toBe(65079);
  expect(step2).toBe(65079);
});
