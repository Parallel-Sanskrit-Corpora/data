# -*- coding: utf-8 -*-
import MySQLdb
import nltk
from nameparser.parser import HumanName

directory_pdf = './html'

db = MySQLdb.connect(user="sanskrit", passwd="sanskrit", db="sanskrit", charset="utf8")
cursor = db.cursor()


def get_chapter(index):
    return '00' + str(index) if index < 10 else ('0' + str(index) if index < 100 else str(index))


def word_count_func(input_string):
    words = input_string.split()
    return len(words)


def get_human_names(text):
    tokens = nltk.tokenize.word_tokenize(text)
    pos = nltk.pos_tag(tokens)

    # return (person_list)


def index():
    cursor.execute("""SELECT code, add_str, nauka FROM aranyakaparva WHERE nauka IS NOT NULL LIMIT 2""")
    rows = cursor.fetchall()
    for row in rows:
        code = row[0]
        range = row[1]
        translation = row[2]

        translation_parts = translation.split('<br>')

        names = get_human_names(' '.join(translation_parts))

        print(names)

        range_parts = range.split('—')
        # if len(range_parts) > 1:
        #     fromValue = int(range_parts[0])
        #     toValue = int(range_parts[1])
        #     diffValue = (toValue - fromValue) + 1
        #     author = False
        #
        #     translation_parts = translation.split('<br>')
        #     if len(translation_parts) > 0:
        #         author = translation_parts[0]
        #         author_word_count = word_count_func(author)
        #         if author_word_count < 5:
        #             translation = ' '.join(translation_parts[1:])
        #
        #     translation_parts = translation.strip().split('.')
        #     translation_parts = list(filter(lambda x: len(x) > 3, translation_parts))
        #     if len(translation_parts) > 0 and len(translation_parts) == diffValue:
        #         print(code, diffValue)

    pass


if __name__ == '__main__':
    index()

    cursor.close()
    db.close()
