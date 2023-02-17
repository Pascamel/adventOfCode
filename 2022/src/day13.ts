import { IDay } from './helpers';
import { readFileSync } from 'fs';

type ArrayNumber = Array<number | ArrayNumber>;
type Pair = {
  left: ArrayNumber;
  right: ArrayNumber;
};

export class Day13 implements IDay<number[]> {
  rightOrder(left: ArrayNumber, right: ArrayNumber): boolean | undefined {
    if (typeof left === 'number' && typeof right === 'number') {
      return left > right ? false : left < right ? true : undefined;
    } else if (Array.isArray(left) !== Array.isArray(right)) {
      return this.rightOrder(
        Array.isArray(left) ? left : [left],
        Array.isArray(right) ? right : [right]
      );
    }

    for (let i = 0, end = Math.max(left.length, right.length); i < end; i++) {
      if (left[i] === undefined) return true;
      if (right[i] === undefined) return false;
      const result = this.rightOrder(
        left[i] as ArrayNumber,
        right[i] as ArrayNumber
      );
      if (result !== undefined) return result;
    }
    return undefined;
  }

  solve(fileName: string) {
    const file: Pair[] = readFileSync(fileName, 'utf-8')
      .split('\n')
      .join('|')
      .split('||')
      .map((v) => ({
        left: JSON.parse(v.split('|')[0]),
        right: JSON.parse(v.split('|')[1]),
      }));

    const step1 = file
      .reduce((acc, pair, index) => {
        return this.rightOrder(pair.left, pair.right)
          ? [...acc, index + 1]
          : acc;
      }, [] as number[])
      .reduce((a, b) => a + b, 0);

    const dividerPackets: ArrayNumber[] = [[[2]], [[6]]];
    const packets = file
      .reduce((acc, pair) => [...acc, pair.left, pair.right], dividerPackets)
      .sort((a, b) => {
        const result = this.rightOrder(a, b);
        return result === undefined ? 0 : result ? -1 : 1;
      });

    const findValue = (v: ArrayNumber) =>
      packets.findIndex((p) => JSON.stringify(p) === JSON.stringify(v)) + 1;

    const step2 = findValue(dividerPackets[0]) * findValue(dividerPackets[1]);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day13.input');

    // 5180 your answer is too low
    console.log('day 13 step 1: ' + step1.toString());
    console.log('day 13 step 2: ' + step2.toString());
  }
}
