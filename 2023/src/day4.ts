import { IDay, Sum } from './helpers';
import { readFileSync } from 'fs';

export class Day4 implements IDay<number[]> {
  solve(fileName: string) {
    const file = readFileSync(fileName, 'utf-8').split('\n');

    const parseString = (s: string) =>
      s
        .split(' ')
        .filter((v) => v.length)
        .map((v) => parseInt(v));

    const cards = file.map((line) => {
      const [winners1, numbers1] = line.split(' | ');
      const [_, winners2] = winners1.split(':');

      const winners = parseString(winners2);
      const numbers = parseString(numbers1);
      const score1 = numbers.filter((n) => winners.some((w) => w === n)).length;

      return score1;
    });

    const step1 = cards
      .map((score1) => (score1 < 2 ? score1 : Math.pow(2, score1 - 1)))
      .reduce(Sum);

    const cardsCounters = Array(cards.length).fill(1);

    for (let i = 0; i < cards.length - 1; i++) {
      for (let j = i + 1; j < i + cards[i] + 1; j++) {
        cardsCounters[j] = cardsCounters[j] + cardsCounters[i];
      }
    }

    const step2 = cardsCounters.reduce(Sum);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day4.input');

    console.log(`day 4 step 1: ${step1}`);
    console.log(`day 4 step 2: ${step2}`);
  }
}
