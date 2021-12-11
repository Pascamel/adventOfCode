import { Day8 } from './day8';

test('Day 8 sample input', () => {
  const [step1, step2] = new Day8().solve('data/day8.sample');

  expect(step1).toBe(26);
  expect(step2).toBe(61229);
});
