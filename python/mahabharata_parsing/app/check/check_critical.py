# -*- coding: utf-8 -*-
import pdfkit
import MySQLdb
import io
import sys
import re
from docx import Document
from collections import Counter
import codecs
from docx.shared import Inches

db = MySQLdb.connect(user="sanskrit", passwd="sanskrit", db="sanskrit", charset="utf8")
cursor = db.cursor()


def word_count_func2(input_string):
    words = input_string.split()
    word_count = Counter(words)
    return word_count


def index():
    cursor.execute("""SELECT code, volume, chapter, verse FROM aranyakaparva WHERE 1""")
    rows = cursor.fetchall()
    prev_verse = 0
    for row in rows:
        code = row[0]
        verse = row[3]

        if prev_verse != verse and verse > 1:
            print(code)

        prev_verse = verse + 1


if __name__ == '__main__':
    index()

    cursor.close()
    db.close()
