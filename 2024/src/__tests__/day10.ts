import {
  day10input,
  day10sample1,
  day10sample2,
  day10sample3,
  day10sample4,
} from '../data';
import { Day10 } from '../day10';

test('Day 10 sample input', () => {
  const [step11, step21] = new Day10().solve(day10sample1);
  expect(step11).toBe(2);
  expect(step21).toBe(2);

  const [step12, step22] = new Day10().solve(day10sample2);
  expect(step12).toBe(4);
  expect(step22).toBe(13);

  const [step13, step23] = new Day10().solve(day10sample3);
  expect(step13).toBe(3);
  expect(step23).toBe(3);

  const [step14, step24] = new Day10().solve(day10sample4);
  expect(step14).toBe(36);
  expect(step24).toBe(81);

  const [finale1, finale2] = new Day10().solve(day10input);
  expect(finale1).toBe(624);
  expect(finale2).toBe(1483);
});
