import { Day3 } from './day3';

test('Day 3 sample input', () => {
  const [step1, step2] = new Day3().solve('data/day3.sample');

  expect(step1).toBe(198);
  expect(step2).toBe(230);
});
