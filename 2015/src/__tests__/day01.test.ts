import { Day01 } from '../day01';

test('Day 01 sample input', () => {
  const [step1, step2] = new Day01().solve('data/day01.sample');

  expect(step1).toBe(-1);
  expect(step2).toBe(5);
});
