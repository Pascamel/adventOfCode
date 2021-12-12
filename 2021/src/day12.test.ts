import { Day12 } from './day12';

test('Day 12 sample input', () => {
  const [step1_1, step2_1] = new Day12().solve('data/day12.sample1');

  expect(step1_1).toBe(10);
  expect(step2_1).toBe(36);

  const [step1_2, step2_2] = new Day12().solve('data/day12.sample2');

  expect(step1_2).toBe(19);
  expect(step2_2).toBe(103);

  const [step1_3, step2_3] = new Day12().solve('data/day12.sample3');

  expect(step1_3).toBe(226);
  expect(step2_3).toBe(3509);
});
