import { Day4 } from './day4';

test('Day 4 sample input', () => {
  const [step1, step2] = new Day4().solve('data/day4.sample');

  expect(step1).toBe(4512);
  expect(step2).toBe(1924);
});
