import { Day8 } from './day8';

test('Day 8 sample input', () => {
  const [step1, step2] = new Day8().solve('data/day8.sample');

  expect(step1).toBe(21);
  expect(step2).toBe(8);

  const [finale1, finale2] = new Day8().solve('data/day8.input');

  expect(finale1).toBe(1715);
  expect(finale2).toBe(374400);
});
