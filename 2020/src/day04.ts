import { day04sample, day04input } from "./data";
import { IDay } from "./helpers";

export class Day04 implements IDay {
  isValidOne(strings: string[]): boolean {
    const keys = strings.map((s) => s.split(":")[0]);

    const required = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

    return required.every((key) => keys.includes(key));
  }

  isValidTwo(strings: string[]): boolean {
    return strings.reduce((acc, str) => {
      if (!acc) return false; // fail fast

      const [key, value] = str.split(":");

      switch (key) {
        case "byr": {
          const n = parseInt(value, 10);
          return acc && n >= 1920 && n <= 2002;
        }
        case "iyr": {
          const n = parseInt(value, 10);
          return acc && n >= 2010 && n <= 2020;
        }
        case "eyr": {
          const n = parseInt(value, 10);
          return acc && n >= 2020 && n <= 2030;
        }
        case "hgt": {
          const unit = value.slice(-2);
          const num = parseInt(value, 10);

          return (
            acc &&
            ((unit === "cm" && num >= 150 && num <= 193) ||
              (unit === "in" && num >= 59 && num <= 76))
          );
        }
        case "hcl":
          return acc && /^#[a-f0-9]{6}$/.test(value);

        case "ecl":
          return acc && /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(value);

        case "pid":
          return acc && /^[0-9]{9}$/.test(value);

        case "cid":
          return acc; // always allowed

        default:
          return acc;
      }
    }, true as boolean);
  }

  solve(input: string) {
    let lines: string[][] = [];
    let passport: string[] = [];

    for (const line of input.split(/\r?\n/)) {
      if (line.trim().length <= 1) {
        lines.push(passport);
        passport = [];
      } else {
        passport = passport.concat(line.trim().split(" "));
      }
    }

    // Push last passport
    lines.push(passport);

    const step1 = lines.filter((line) => this.isValidOne(line)).length;
    const step2 = lines.filter((line) => this.isValidTwo(line)).length;

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day04input);

    console.log(`Day 04 step 1: ${step1}`);
    console.log(`Day 04 step 2: ${step2}`);
  }
}
