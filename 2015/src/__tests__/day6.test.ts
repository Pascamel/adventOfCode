import { Day6 } from '../day6';

test('Day 6 sample input', () => {
  const [step1, step2] = new Day6().solve('data/day6.sample');

  expect(step1).toBe(998996);
  expect(step2).toBe(1001996);
});
