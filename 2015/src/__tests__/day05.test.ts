import { Day05 } from '../day05';

test('Day 05 sample input', () => {
  const [step1, step2] = new Day05().solve('data/day05.sample');

  expect(step1).toBe(2);
  expect(step2).toBe(0);
});
