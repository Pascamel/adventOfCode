import { day06sample } from "./data";
import { IDay } from "./helpers";

export class Day06 implements IDay<number[]> {
  solve(input: string) {
    const lines1 = input.split("\n");
    const operators1 = lines1.pop()!.replace(/\s+/g, "").split("");
    const numbers1 = lines1.map((line) =>
      line
        .split(" ")
        .filter((i) => i !== "")
        .map((i) => parseInt(i, 10))
    );

    const step1 = operators1.reduce(
      (acc, operator, index) =>
        acc +
        numbers1
          .map((line) => line[index])
          .reduce(
            (acc, number) => (operator === "+" ? acc + number : acc * number),
            operator === "+" ? 0 : 1
          ),
      0
    );

    // read input according to direction for part 2
    const lines2 = input.split("\n");
    const operators2 = lines2.pop()!;
    const numbers2: { operator: string; numbers: number[] }[] = [];

    let operator = "";
    let numbers: number[] = [];

    for (let i = 0; i < operators2.length; i++) {
      if (operators2[i] === "+" || operators2[i] === "*") {
        if (operator.length > 0) {
          numbers2.push({ operator, numbers });
        }
        operator = operators2[i];
        numbers = [];
      }

      const number = lines2.map((line) => line[i]).join("");
      const parsedNumber = parseInt(number, 10);
      if (!isNaN(parsedNumber)) {
        numbers.push(parsedNumber);
      }
    }
    numbers2.push({ operator, numbers });

    // process step 2
    const step2 = numbers2.reduce((acc, number2) => {
      return (
        acc +
        number2.numbers.reduce(
          (acc2, n) => {
            return number2.operator === "+" ? acc2 + n : acc2 * n;
          },
          number2.operator === "+" ? 0 : 1
        )
      );
    }, 0);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day06sample);

    console.log(`day 06 step 1: ${step1}`);
    console.log(`day 06 step 2: ${step2}`);
  }
}
