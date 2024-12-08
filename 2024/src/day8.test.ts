import { Day8 } from './day8';

test('Day 8 sample input', () => {
  const [step1, step2] = new Day8().solve('data/day8.sample');

  expect(step1).toBe(7);
  expect(step2).toBe(34);

  const [finale1, finale2] = new Day8().solve('data/day8.input');

  expect(finale1).toBe(371);
  expect(finale2).toBe(1229);
});
