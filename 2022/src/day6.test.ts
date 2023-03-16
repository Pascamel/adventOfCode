import { Day6 } from './day6';

test('Day 6 sample input', () => {
  const [step1_1, step2_1] = new Day6().solve('data/day6.sample1');
  const [step1_2, step2_2] = new Day6().solve('data/day6.sample2');
  const [step1_3, step2_3] = new Day6().solve('data/day6.sample3');
  const [step1_4, step2_4] = new Day6().solve('data/day6.sample4');
  const [step1_5, step2_5] = new Day6().solve('data/day6.sample5');

  expect(step1_1).toBe(7);
  expect(step2_1).toBe(19);
  expect(step1_2).toBe(5);
  expect(step2_2).toBe(23);
  expect(step1_3).toBe(6);
  expect(step2_3).toBe(23);
  expect(step1_4).toBe(10);
  expect(step2_4).toBe(29);
  expect(step1_5).toBe(11);
  expect(step2_5).toBe(26);

  const [finale1, finale2] = new Day6().solve('data/day6.input');

  expect(finale1).toBe(1655);
  expect(finale2).toBe(2665);
});
