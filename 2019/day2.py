import pathlib

list_input = [int (x) for x in pathlib.Path('./day2.input').read_text().split(',')]

def helper(list_ints):
	pos = 0
	done = False

	while pos < len(list_ints)-4:
		if list_ints[pos] == 99:
			return list_ints[0]
		elif list_ints[pos] == 1:
			list_ints[list_ints[pos + 3]] = list_ints[list_ints[pos + 1]] + list_ints[list_ints[pos + 2]]
			pos += 4
		elif list_ints[pos] == 2:
			list_ints[list_ints[pos + 3]] = list_ints[list_ints[pos + 1]] * list_ints[list_ints[pos + 2]]
			pos += 4
		else:
			return -1

	return -1

# step 1
list1 = list_input[:]

list1[1] = 12
list1[2] = 2

print('step1', helper(list1))

# step 2
for noun in range(80):
	for verb in range(80):
		list2 = list_input[:]

		list2[1] = noun
		list2[2] = verb

		if helper(list2) == 19690720:
			print('step2', 100 * noun + verb)
