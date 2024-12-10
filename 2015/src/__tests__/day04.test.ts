import { Day04 } from '../day04';

test('Day 04 sample input', () => {
  const [step1, step2] = new Day04().solve('data/day04.sample');

  expect(step1).toBe(609043);
  expect(step2).toBe(6742839);
});
