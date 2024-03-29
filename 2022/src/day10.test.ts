import { Day10 } from './day10';

test('Day 10 sample input', () => {
  const [step1, step2] = new Day10().solve('data/day10.sample');

  expect(step1).toBe(13140);
  expect(step2).toBe(
    '##..##..##..##..##..##..##..##..##..##..' +
      '###...###...###...###...###...###...###.' +
      '####....####....####....####....####....' +
      '#####.....#####.....#####.....#####.....' +
      '######......######......######......####' +
      '#######.......#######.......#######.....'
  );

  const [finale1, finale2] = new Day10().solve('data/day10.input');

  expect(finale1).toBe(11780);
  expect(finale2).toBe(
    '###..####.#..#.#....###...##..#..#..##..' +
      '#..#....#.#..#.#....#..#.#..#.#..#.#..#.' +
      '#..#...#..#..#.#....###..#..#.#..#.#..#.' +
      '###...#...#..#.#....#..#.####.#..#.####.' +
      '#....#....#..#.#....#..#.#..#.#..#.#..#.' +
      '#....####..##..####.###..#..#..##..#..#.'
  );
});
