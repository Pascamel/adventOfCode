import { Day07 } from '../day07';

test('Day 07 sample input', () => {
  const [step1, step2] = new Day07().solve('data/day07.sample');

  expect(step1).toBe(65079);
  expect(step2).toBe(65079);
});
