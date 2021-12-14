import { Day1 } from './day1';

test('Day 13 sample input', () => {
  const [step1, step2] = new Day1().solve('data/day13.sample');

  expect(step1).toBe(8);
  expect(step2).toBe(456);
});
