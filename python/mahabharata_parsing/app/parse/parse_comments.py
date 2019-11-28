# -*- coding: utf-8 -*-
import MySQLdb
import re
from docx import Document
from collections import Counter


db = MySQLdb.connect(user="sanskrit", passwd="sanskrit", db="sanskrit", charset="utf8")
pathToFile = './translation/03-aranyakaparva-comments.txt'
cursor = db.cursor()
volume = 3


def order_bag_of_words(bag_of_words, desc=False):
   words = [(word, cnt) for word, cnt in bag_of_words.items()]
   return sorted(words, key=lambda x: x[1], reverse=desc)


def record_word_cnt(words, bag_of_words):
   for word in words:
       if word != '':
           if word.lower() in bag_of_words:
               bag_of_words[word.lower()] += 1
           else:
               bag_of_words[word.lower()] = 1


def get_chapter(index):
    return '00' + str(index) if index < 10 else ('0' + str(index) if index < 100 else str(index))


def word_count_func2(input_string):
    words = input_string.split()
    word_count = Counter(words)
    return word_count


def word_count_func(input_string):
    words = input_string.split()
    return len(words)


def index():
    data_to_insert = []
    with open(pathToFile) as fp:
        fromValue = False
        toValue = False
        for line in fp:
            striped_line = line.strip()
            if len(striped_line) > 0:
                match = re.match(r'^(\d+)', striped_line)
                numbers = re.findall(r'\d+', striped_line)
                if match:
                    parts = striped_line.split(' ')
                    data_to_insert.append([3, fromValue, toValue, int(match.group(1)), ' '.join(parts[1:])])
                    pass
                else:
                    fromValue = int(numbers[0])
                    toValue = int(numbers[0])
                    if len(numbers) > 1:
                        toValue = int(numbers[1])

    cursor.executemany("""INSERT INTO comments (volume, from_chapter, to_chapter, number, text) VALUES (%s, %s, %s, %s, %s)""", data_to_insert)
    db.commit()


if __name__ == '__main__':
    index()

    cursor.close()
    db.close()
