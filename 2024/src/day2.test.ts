import { Day2 } from './day2';

test('Day 2 sample input', () => {
  const [step1, step2] = new Day2().solve('data/day2.sample');

  expect(step1).toBe(2);
  expect(step2).toBe(4);

  const [finale1, finale2] = new Day2().solve('data/day2.input');

  expect(finale1).toBe(332);
  expect(finale2).toBe(398);
});
