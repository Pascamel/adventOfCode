import { Day11 } from './day11';

test('Day 11 sample input', () => {
  const [step1, step2] = new Day11().solve('data/day11.sample');

  expect(step1).toBe(1656);
  expect(step2).toBe(195);
});
