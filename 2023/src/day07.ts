import { day07sample } from "./data";
import { IDay } from "./helpers";

function getHandType(hand: string, joker: boolean) {
  const cards = hand.split("");
  const cardCounts = cards.reduce((acc, card) => {
    acc[card] = (acc[card] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const cardValues = Object.values(cardCounts);
  const jokerValue = cardCounts.hasOwnProperty("J") ? cardCounts["J"] : 0;

  // make a new object from cardCounts but without the Joker
  const nonJokerCounts = Object.fromEntries(
    Object.entries(cardCounts).filter(([key]) => key !== "J")
  );
  const nonJokerValues = Object.values(nonJokerCounts);

  // special case of the hand containing 5 Js
  if (nonJokerValues.length === 0) {
    nonJokerValues.push(0);
  }

  nonJokerValues.sort((a, b) => b - a);
  nonJokerValues[0] += jokerValue;

  const valuesToUse = joker ? nonJokerValues : cardValues;

  // Five of a kind, where all five cards have the same label: AAAAA
  if (valuesToUse.includes(5)) {
    return 1;
  }
  // Four of a kind, where four cards have the same label and one card has a different label: AA8AA
  if (valuesToUse.includes(4)) {
    return 2;
  }
  // Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
  if (valuesToUse.includes(3) && valuesToUse.includes(2)) {
    return 3;
  }
  // Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
  if (valuesToUse.includes(3)) {
    return 4;
  }
  // Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
  if (valuesToUse.includes(2) && valuesToUse.includes(1) && valuesToUse.length === 3) {
    return 5;
  }
  // One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
  if (valuesToUse.includes(2) && valuesToUse.length === 4) {
    return 6;
  }
  // High card, where all cards' labels are distinct: 23456
  return 7;
}

function sortCards(
  a: { hand: string; score: number; type: number },
  b: { hand: string; score: number; type: number },
  joker: boolean
) {
  const cardValues = joker
    ? ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"]
    : ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

  if (a.type !== b.type) {
    return b.type - a.type;
  }
  if (cardValues.indexOf(a.hand[0]) !== cardValues.indexOf(b.hand[0])) {
    return cardValues.indexOf(a.hand[0]) - cardValues.indexOf(b.hand[0]);
  }
  if (cardValues.indexOf(a.hand[1]) !== cardValues.indexOf(b.hand[1])) {
    return cardValues.indexOf(a.hand[1]) - cardValues.indexOf(b.hand[1]);
  }
  if (cardValues.indexOf(a.hand[2]) !== cardValues.indexOf(b.hand[2])) {
    return cardValues.indexOf(a.hand[2]) - cardValues.indexOf(b.hand[2]);
  }
  if (cardValues.indexOf(a.hand[3]) !== cardValues.indexOf(b.hand[3])) {
    return cardValues.indexOf(a.hand[3]) - cardValues.indexOf(b.hand[3]);
  }

  return cardValues.indexOf(a.hand[4]) - cardValues.indexOf(b.hand[4]);
}

export class Day07 implements IDay<number[]> {
  solve(input: string) {
    const lines1 = input.split("\n").map((line) => ({
      hand: line.split(" ")[0],
      score: parseInt(line.split(" ")[1]),
      type: getHandType(line.split(" ")[0], false),
    }));
    lines1.sort((a, b) => sortCards(a, b, false));

    const lines2 = input.split("\n").map((line) => ({
      hand: line.split(" ")[0],
      score: parseInt(line.split(" ")[1]),
      type: getHandType(line.split(" ")[0], true),
    }));
    lines2.sort((a, b) => sortCards(a, b, true));

    const step1 = lines1.reduce((acc, line, idx) => acc + line.score * (idx + 1), 0);
    const step2 = lines2.reduce((acc, line, idx) => acc + line.score * (idx + 1), 0);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day07sample);

    console.log(`day 07 step 1: ${step1}`);
    console.log(`day 07 step 2: ${step2}`);
  }
}
