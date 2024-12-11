import { Day11 } from './day11';

test('Day 11 sample input', () => {
  const [test1, test2] = new Day11().solve('125 17');
  expect(test1).toBe(55312);
  expect(test2).toBe(65601038650482);  

  const [finale1, finale2] = new Day11().solve('5 62914 65 972 0 805922 6521 1639064');
  expect(finale1).toBe(199753);
  expect(finale2).toBe(239413123020116);
});
