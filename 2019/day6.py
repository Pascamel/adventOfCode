import pathlib


def build_data(input):
    result = {}

    for s in input:
        a, b = s.split(')')

        if a not in result:
            result[a] = []
        if b not in result[a]:
            result[a].append(b)

    return result

def count(planet, hash):
    if planet not in hash:
        hash[planet] = sum([1 + count(p, hash) for p in data[planet]]) if planet in data else 0

    return hash[planet]


def build_hash():
    result = {}

    count('COM', result)

    return result


def search_path(source, destination):
    seen = {source: 0}

    while destination not in seen:
        seen2 = {}

        for s in seen:
            for planet, satellites in data.items():
                if s in satellites and planet not in seen and planet not in seen2:
                    seen2[planet] = seen[s]+1
            for ss in data[s] if s in data else []:
                if ss not in seen and ss not in seen2:
                    seen2[ss] = seen[s]+1

        seen.update(seen2)

    return seen[destination] - 2


input = [x for x in pathlib.Path('./day6.input').read_text().splitlines()]
data = build_data(input)
hash = build_hash()

print('step1', sum(hash.values()))
print('step2', search_path('YOU', 'SAN'))
