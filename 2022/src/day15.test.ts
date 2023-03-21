import { Day15 } from './day15';

test('Day 15 sample input', () => {
  const [step1, step2] = new Day15().solve('data/day15.sample');

  expect(step1).toBe('10=26, 2000000=0');
  expect(step2).toBe('0');

  const [finale1, finale2] = new Day15().solve('data/day15.input');

  expect(finale1).toBe('10=5135731, 2000000=5147333');
  expect(finale2).toBe('13734006908372');
});
