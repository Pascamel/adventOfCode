import { Day5 } from './day5';

test('Day 5 sample input', () => {
  const [step1, step2] = new Day5().solve('data/day5.sample');

  expect(step1).toBe(35);
  expect(step2).toBe(46);

  const [finale1, finale2] = new Day5().solve('data/day5.input');

  expect(finale1).toBe(174137457);
  expect(finale2).toBe(1493866);
});
