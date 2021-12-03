import { Day2 } from './day2';

test('Day 2 sample input', () => {
  const [step1, step2] = new Day2().solve('data/day2.sample');

  expect(step1).toBe(101);
  expect(step2).toBe(48);
});
