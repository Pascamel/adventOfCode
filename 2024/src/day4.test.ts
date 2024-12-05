import { Day4 } from './day4';

test('Day 4 sample input', () => {
  const [step1, step2] = new Day4().solve('data/day4.sample');

  expect(step1).toBe(18);
  expect(step2).toBe(9);

  const [finale1, finale2] = new Day4().solve('data/day4.input');

  expect(finale1).toBe(2390);
  expect(finale2).toBe(1809);
});
