import { Day7 } from '../day7';

test('Day 7 sample input', () => {
  const [step1, step2] = new Day7().solve('data/day7.sample');

  expect(step1).toBe(65079);
  expect(step2).toBe(65079);
});
