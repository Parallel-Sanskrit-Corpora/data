from difflib import SequenceMatcher


def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()


if __name__ == '__main__':
    print(similar("Apple", "Appel"))
    print(similar("garhayanto 'sakṛd bhīṣmaviduradroṇagautamān", "garhayanto'sakṛdbhīṣmaviduradroṇagautamān"))
    pass
