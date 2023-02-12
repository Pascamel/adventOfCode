import { Day4 } from './day4';

test('Day 4 sample input', () => {
  const [step1, step2] = new Day4().solve('data/day4.sample');

  expect(step1).toBe(2);
  expect(step2).toBe(4);

  const [finale1, finale2] = new Day4().solve('data/day4.input');

  expect(finale1).toBe(424);
  expect(finale2).toBe(804);
});
