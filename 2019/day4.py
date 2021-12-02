import pathlib

start, end = [int(s) for s in pathlib.Path('./day4.input').read_text().split('-')]

step1, step2 = 0, 0

for i in range(start, end + 1):
    digits = [i // 100000, i // 10000 % 10, i // 1000 % 10, i // 100 % 10, i // 10 % 10, i % 10]

    if not any(digits[i] == digits[i+1] for i in range(0, 5)):
        continue
    if any(digits[i] > digits[i+1] for i in range(0, 5)):
        continue

    step1 += 1

for i in range(start, end + 1):
    digits = [i // 100000, i // 10000 % 10, i // 1000 % 10, i // 100 % 10, i // 10 % 10, i % 10]

    if not any(digits[i] == digits[i+1]
               and (i == 4 or digits[i+1] != digits[i+2])
               and (i == 0 or digits[i-1] != digits[i]) for i in range(0, 5)):
        continue
    if any(digits[i] > digits[i+1] for i in range(0, 5)):
        continue

    step2 += 1

print('step1', step1, 'step2', step2)
