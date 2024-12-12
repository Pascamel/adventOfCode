import { day12input } from '../data';
import { Day12 } from '../day12';

test('Day 12 sample input', () => {
  const [step1, step2] = new Day12().solve(day12input);

  expect(step1).toBe(119433);
  expect(step2).toBe(68466);
});
