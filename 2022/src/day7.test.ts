import { Day7 } from './day7';

test('Day 7 sample input', () => {
  const [step1, step2] = new Day7().solve('data/day7.sample');

  expect(step1).toBe(95437);
  expect(step2).toBe(584);

  const [finale1, finale2] = new Day7().solve('data/day7.input');

  expect(finale1).toBe(1723892);
  expect(finale2).toBe(8474158);
});
