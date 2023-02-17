import { Day13 } from './day13';

test('Day 13 sample input', () => {
  const [step1, step2] = new Day13().solve('data/day13.sample');

  expect(step1).toBe(13);
  expect(step2).toBe(140);

  const [finale1, finale2] = new Day13().solve('data/day13.input');

  expect(finale1).toBe(5208);
  expect(finale2).toBe(25792);
});
