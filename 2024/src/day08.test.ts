import { Day08 } from './day08';

test('Day 8 sample input', () => {
  const [step1, step2] = new Day08().solve('data/day08.sample');

  expect(step1).toBe(7);
  expect(step2).toBe(34);

  const [finale1, finale2] = new Day08().solve('data/day08.input');

  expect(finale1).toBe(371);
  expect(finale2).toBe(1229);
});
