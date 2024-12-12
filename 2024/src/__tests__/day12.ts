import { day12input, day12sample1, day12sample2, day12sample3 } from '../data';
import { Day12 } from '../day12';

test('Day 12 sample input', () => {
  const [test11, test21] = new Day12().solve(day12sample1);
  expect(test11).toBe(140);
  expect(test21).toBe(80);

  const [test12, test22] = new Day12().solve(day12sample2);
  expect(test12).toBe(772);
  expect(test22).toBe(436);

  const [test13, test23] = new Day12().solve(day12sample3);
  expect(test13).toBe(1930);
  expect(test23).toBe(1206);

  const [finale1, finale2] = new Day12().solve(day12input);
  expect(finale1).toBe(1450816);
  expect(finale2).toBe(865662);
});
