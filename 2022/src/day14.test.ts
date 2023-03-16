import { Day14 } from './day14';

test('Day 14 sample input', () => {
  const [step1, step2] = new Day14().solve('data/day14.sample');

  expect(step1).toBe(24);
  expect(step2).toBe(93);

  const [finale1, finale2] = new Day14().solve('data/day14.input');

  expect(finale1).toBe(1061);
  expect(finale2).toBe(25055);
});
