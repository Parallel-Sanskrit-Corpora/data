# -*- coding: utf-8 -*-
import MySQLdb
import re
from docx import Document
from collections import Counter
import codecs


db = MySQLdb.connect(user="sanskrit", passwd="sanskrit", db="sanskrit", charset="utf8")
document = Document('./translation/Mahabharata_3_Neveleva-Vasilkov.doc')
cursor = db.cursor()
volume = 3


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
    cursor.execute("""UPDATE aranyakaparva SET nauka=NULL, add_str=NULL WHERE 1""")
    db.commit()

    chapter = 0
    add_verses = []
    is_allowed = False
    for paragraph in document.paragraphs:
        paragraphText = paragraph.text.strip()
        match = re.match('ГЛАВА(\s+)(\w+)', paragraphText)
        matchEnd = re.match('Такова в книге', paragraphText)
        if match:
            chapter = int(match.group(2))
            is_allowed = True
        elif matchEnd:
            # print(paragraphText)
            is_allowed = False
            pass
        elif chapter > 0 and len(paragraphText) > 0 and is_allowed:
            fromValue = 0
            add_str = ''
            word_count = word_count_func(paragraphText)
            matchRange = re.match('(\d+)—(\d+)', paragraphText)
            matchSingle = re.match('(\d+)', paragraphText)
            print(paragraphText)
            if matchRange:
                fromValue = int(matchRange.group(1))
                toValue = int(matchRange.group(2))
                add_str = str(fromValue) + '—' + str(toValue)
                paragraphText = re.sub('(\d+)—(\d+)', '', paragraphText).strip()
                if len(add_verses) > 0:
                    paragraphText = '<br>'.join(add_verses) + '<br>' + paragraphText
                add_verses = []
                pass
            elif matchSingle:
                fromValue = int(matchSingle.group(1))
                add_str = str(fromValue)
                paragraphText = re.sub('(\d+)', '', paragraphText, 1).strip()
                if len(add_verses) > 0:
                    paragraphText = '<br>'.join(add_verses) + '<br>' + paragraphText
                add_verses = []
                pass
            if fromValue == 0:
                add_verses.append(paragraphText)
            else:
                verse_key = str(volume) + '.' + get_chapter(chapter) + '.' + get_chapter(fromValue)

                print(verse_key, paragraphText, add_str, fromValue)

                cursor.execute("""UPDATE aranyakaparva SET nauka=%s, add_str=%s  WHERE code=%s""", (paragraphText, add_str, verse_key))
            pass
    db.commit()


if __name__ == '__main__':
    index()

    cursor.close()
    db.close()
