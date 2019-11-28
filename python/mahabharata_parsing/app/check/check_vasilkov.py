# -*- coding: utf-8 -*-
import MySQLdb
from collections import Counter

db = MySQLdb.connect(user="sanskrit", passwd="sanskrit", db="sanskrit", charset="utf8")
cursor = db.cursor()


def word_count_func2(input_string):
    words = input_string.split()
    word_count = Counter(words)
    return word_count


def index():
    cursor.execute("""SELECT code, volume, chapter, verse, add_str FROM aranyakaparva WHERE add_str IS NOT NULL""")
    rows = cursor.fetchall()
    prev_next = 0
    for row in rows:
        code = row[0]
        verse = row[3]
        splitted = row[4].split('—')

        if int(prev_next) != verse and verse != 1:
            print(code, prev_next, verse)

        if len(splitted) > 1:
            prev_next = int(splitted[1]) + 1
        else:
            prev_next = int(splitted[0]) + 1


if __name__ == '__main__':
    index()

    cursor.close()
    db.close()
