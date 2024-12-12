import { day11input, day11sample } from '../data';
import { Day11 } from '../day11';

test('Day 11 sample input', () => {
  const [test1, test2] = new Day11().solve(day11sample);
  expect(test1).toBe(55312);
  expect(test2).toBe(65601038650482);

  const [finale1, finale2] = new Day11().solve(day11input);
  expect(finale1).toBe(199753);
  expect(finale2).toBe(239413123020116);
});
