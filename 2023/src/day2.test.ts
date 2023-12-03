import { Day2 } from './day2';

test('Day 2 sample input', () => {
  const [step1, step2] = new Day2().solve('data/day2.sample');

  expect(step1).toBe(8);
  expect(step2).toBe(2286);

  const [finale1, finale2] = new Day2().solve('data/day2.input');

  expect(finale1).toBe(2679);
  expect(finale2).toBe(77607);
});
