import pathlib

list_input = [s for s in pathlib.Path('./day3.input').read_text().splitlines()]

def build_array(commands):
    result, x, y = [(0,0)], 0, 0

    for command in commands:
        direction, counter = command[0], int(command[1:])

        while counter > 0:
            if direction == 'U': y += 1
            if direction == 'D': y -= 1
            if direction == 'R': x += 1
            if direction == 'L': x -= 1
            result.append((x, y))
            counter -= 1

    return result

points1 = build_array([c for c in list_input[0].split(',')])
points2 = build_array([c for c in list_input[1].split(',')])
intersect = list(set(points1) & set(points2))
intersect.remove((0,0))

step1 = list(map(lambda x: abs(x[0]) + abs(x[1]), intersect))
step1.sort()

step2 = list(map(lambda x: points1.index(x) + points2.index(x), intersect))
step2.sort()

print('step 1', step1[0], 'step 2', step2[0])
