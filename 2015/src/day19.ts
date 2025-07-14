import { day19input } from './data';
import { IDay } from './helpers';

export class Day19 implements IDay {
  step1(replacements: { from: string; to: string }[], source: string) {
    return replacements
      .map((replacement) => {
        const regex = new RegExp(replacement.from, 'g');
        const matches = [...source.matchAll(regex)];
        const indexes = matches.map((match) => match.index!);

        return indexes.map((index: number) => {
          const before = source.slice(0, index);
          const after = source.slice(index + replacement.from.length);
          return before + replacement.to + after;
        });
      })
      .flat();
  }

  step2(replacements: { from: string; to: string }[], source: string) {
    let step = 0;
    let found = false;
    let sources = [source];

    while (!found) {
      step++;
      const newSources = [];

      for (const s of sources) {
        for (const replacement of replacements) {
          const regex = new RegExp(replacement.to, 'g');
          const matches = [...s.matchAll(regex)];
          const indexes = matches.map((match) => match.index!);

          for (const index of indexes) {
            const before = s.slice(0, index);
            const after = s.slice(index + replacement.to.length);

            newSources.push(before + replacement.from + after);
            if (before + replacement.from + after === 'e') {
              found = true;
            }
          }
        }
      }
      sources = [...new Set(newSources)]
        .sort((a, b) => a.length - b.length)
        .slice(0, 1000);
    }

    return step;
  }

  solve(input: string) {
    const parts = input.split('\n');
    const replacements = parts
      .slice(0, -2)
      .map((s) => ({ from: s.split(' => ')[0], to: s.split(' => ')[1] }));
    const source = parts[parts.length - 1];

    const step1 = this.step1(replacements, source);
    const step2 = this.step2(replacements, source);

    return [new Set(step1).size, step2];
  }

  run() {
    const [step1, step2] = this.solve(day19input);

    console.log(`day 18 step 1: ${step1}`);
    console.log(`day 18 step 2: ${step2}`);
  }
}
