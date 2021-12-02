use namespace HH\Lib\{C, Str, Vec, Regex};

class Day4 extends DayBase {
  private vec<vec<string>> $lines2 = vec[];

  public function __construct(string $file_name) {
    parent::load_file($file_name);
    $passport = vec[];
    foreach($this->lines as $line) {
      if (Str\length($line) <= 1) {
        $this->lines2[] = $passport;
        $passport = vec[];
      } else {
        $passport = Vec\concat(
          $passport,
          Str\split(Str\trim($line), ' '), 
        );
      }
    }
    $this->lines2[] = $passport;
  }

  private static function is_valid_one(vec<string> $strings): bool {
    $keys = Vec\map(
      $strings,
      $s ==> Str\split($s, ':')[0]
    );
    return C\reduce(
      vec['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'],
      ($acc, $s) ==> $acc && C\contains($keys, $s),
      true
    );
  }

  private static function is_valid_two(vec<string> $strings): bool {
    return C\reduce(
      $strings,
      ($acc, $string) ==> {
        $parts = Str\split($string, ':');
        switch ($parts[0]) {
          case 'byr':
            return $acc && ((int)$parts[1]) >= 1920 && ((int)$parts[1]) <= 2002;  
          case 'iyr':
            return $acc && ((int)$parts[1]) >= 2010 && ((int)$parts[1]) <= 2020;
          case 'eyr':
            return $acc && ((int)$parts[1]) >= 2020 && ((int)$parts[1]) <= 2030;
          case 'hgt':
            $unit = Str\slice($parts[1], Str\length($parts[1])-2);
            $val = ((int)$parts[1]);
            return $acc && (
              ($unit === "cm" && $val >= 150 && $val <= 193) 
                || ($unit === "in" && $val >= 59 && $val <= 76)
            );
          case 'hcl':
            return $acc && Regex\matches(
              $parts[1], 
              re"/#[a-f0-9]{6}/"
            );
          case 'ecl':
            return $acc && Regex\matches(
              $parts[1],
              re"/amb|blu|brn|gry|grn|hzl|oth/"
            );
          case 'pid':
            return $acc && Regex\matches(
              $parts[1], 
              re"/[0-9]{9}/"
            );
          case 'cid':
            return $acc;
        }
        return $acc;
      },
      true
    );
  }

  private function part_one(): int {
    return C\count(
      Vec\filter(
        $this->lines2, 
        $line ==> self::is_valid_one($line)
      )
    );
  }

  private function part_two(): int {
    return C\count(
      Vec\filter(
        $this->lines2, 
        $line ==> self::is_valid_one($line) && self::is_valid_two($line)
      )
    );
  }

  public static function solve(string $sample_file, string $input_file): string {
    $sample = new Day4($sample_file);
    $input = new Day4($input_file);

    return Str\join(vec[
      Str\format("part 1 : %d - %d", $sample->part_one(), $input->part_one()),
      \PHP_EOL,
      Str\format("part 2 : %d - %d", $sample->part_two(), $input->part_two()),
      \PHP_EOL,
    ], '');
  }
}