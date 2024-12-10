import { Day04 } from './day04';

test('Day 4 sample input', () => {
  const [step1, step2] = new Day04().solve('data/day04.sample');

  expect(step1).toBe(18);
  expect(step2).toBe(9);

  const [finale1, finale2] = new Day04().solve('data/day04.input');

  expect(finale1).toBe(2390);
  expect(finale2).toBe(1809);
});
