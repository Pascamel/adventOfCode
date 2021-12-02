import pathlib
import itertools


def parameter_mode(input, command, pos):
    modes = list(('00000' + str(command))[-5:])

    return [input[pos + 1 + i] if int(modes[2-i]) == 0 else (pos + 1 + i) for i in range(0,3)]


def helper(list_ints, intputs):
    pos, index, outputs = 0, 0, intputs[:]

    while list_ints[pos] != 99 and len(outputs) < 100:
        param1, param2, param3 = parameter_mode(list_ints, list_ints[pos], pos)

        if list_ints[pos] % 10 == 1:
            list_ints[param3] = list_ints[param1] + list_ints[param2]
            pos += 4
        elif list_ints[pos] % 10 == 2:
            list_ints[param3] = list_ints[param1] * list_ints[param2]
            pos += 4
        elif list_ints[pos] % 10 == 3:
            list_ints[param1] = outputs[index]
            index += 1
            pos += 2
        elif list_ints[pos] % 10 == 4:
            outputs.append(list_ints[param1])
            pos += 2
        elif list_ints[pos] % 10 == 5:
            pos = list_ints[param2] if list_ints[param1] != 0 else pos + 3
        elif list_ints[pos] % 10 == 6:
            pos = list_ints[param2] if list_ints[param1] == 0 else pos + 3
        elif list_ints[pos] % 10 == 7:
            list_ints[param3] = 1 if list_ints[param1] < list_ints[param2] else 0
            pos += 4
        elif list_ints[pos] % 10 == 8:
            list_ints[param3] = 1 if list_ints[param1] == list_ints[param2] else 0
            pos += 4

    return outputs[-1]


def step1():
    input = [int (x) for x in pathlib.Path('./day7.input').read_text().split(',')]
    result = 0

    for subset in list(itertools.permutations([0,1,2,3,4], 5)):
        copy_input, n = input[:], 0

        for sub in subset:
            n = helper(copy_input, [sub, n])

        if n>result:
            result = n

    return result


print('step1', step1())
