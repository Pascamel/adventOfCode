import { Day5 } from '../day5';

test('Day 5 sample input', () => {
  const [step1, step2] = new Day5().solve('data/day5.sample');

  expect(step1).toBe(2);
  expect(step2).toBe(0);
});
