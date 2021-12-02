import pathlib 

list_ints = [int (x) for x in pathlib.Path('./day1.input').read_text().splitlines()]


def fuel_needed(mass):
    return max(0, (mass - (mass % 3)) / 3 - 2)


def fuel_needed_total(mass):
    result = 0
    current = fuel_needed(mass)

    while current > 0:
        result += current
        current = fuel_needed(current)

    return result
    

# part 1
mutated1 = [fuel_needed(i) for i in list_ints]
print('part 1:', int(sum(mutated1)))

# part 2
mutated2 = [fuel_needed_total(i) for i in list_ints]
print('part 2:', int(sum(mutated2)))
