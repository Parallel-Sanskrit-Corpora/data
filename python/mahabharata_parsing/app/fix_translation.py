# -*- coding: utf-8 -*-
import MySQLdb
import re
from difflib import SequenceMatcher

db = MySQLdb.connect(user="sanskrit", passwd="sanskrit", db="sanskrit", charset="utf8")
cursor = db.cursor()


def remove_extra_chars(string):
    regexp = re.compile('॥(\d+)+॥')
    changed_string = re.sub(regexp, '', string)
    return changed_string


def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()


def index():
    cursor.execute("""SELECT a.add_str, a.code, a.id FROM aranyakaparva a""")
    rows = cursor.fetchall()
    add_string = None
    for row in rows:
        additional = row[0]
        code = row[1]
        id = row[2]
        if additional != None and add_string != additional:
            add_string = additional
            pass

        add_parts = additional.split('—')
        if add_parts and len(add_parts) == 2:
            cursor.execute("""UPDATE aranyakaparva SET from_value=%s, to_value=%s WHERE id=%s""", (add_parts[0], add_parts[1], id))
        # if additional is None:
        #     cursor.execute("""UPDATE aranyakaparva SET add_str=%s WHERE id=%s""", (add_string, id))
        #     print(add_string, code)
    db.commit()


if __name__ == '__main__':
    index()

    cursor.close()
    db.close()
