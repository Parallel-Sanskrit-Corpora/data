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
    cursor.execute("""SELECT ic.code, ic.devanagari, ic.iast, sm.iast
    FROM `iast_critical` ic
    LEFT JOIN oliver_sentence_mhb_mapping sm ON sm.code=ic.code AND sm.number=ic.number
    WHERE 1""")
    rows = cursor.fetchall()
    prev_verse = 0
    for row in rows:
        code = row[0]
        devanagari = row[1]
        iast_1 = remove_extra_chars(row[2]).replace('।', '').strip()
        iast_2 = row[3]

        if iast_1 and iast_2:
            # print(iast_1, iast_2, similar(iast_1, iast_2))
            pass
        else:
            print(iast_1, iast_2, code)


def fill_oliver():
    cursor.execute("""SELECT code, iast, id FROM `iast_critical` WHERE `code` LIKE '3.%'""")
    critical_rows = cursor.fetchall()
    prev_condition_code = None
    oliver_rows = []
    prev_execution_percent = 0
    for counter, critical_row in enumerate(critical_rows):
        code = critical_row[0]
        critical_id = critical_row[2]
        critical_iast = remove_extra_chars(critical_row[1]).replace('।', '').replace('॥', '').strip()

        code_parts = code.split('.')
        condition_code = '.'.join(code_parts[:2])

        if condition_code != prev_condition_code:
            prev_condition_code = condition_code
            cursor.execute("SELECT id, iast FROM `oliver_sentence_mhb_mapping` WHERE `code` LIKE " + "'" + condition_code + ".%'")
            oliver_rows = cursor.fetchall()

        for oliver_row in oliver_rows:
            oliver_id = oliver_row[0]
            oliver_iast = oliver_row[1]

            match_percent = similar(critical_iast, oliver_iast)

            if match_percent > 0.8:
                cursor.execute("""UPDATE iast_critical SET oliver_id=%s WHERE id=%s""", (oliver_id, critical_id))
                pass
        pass

        execution_percent = int((100 * counter) / len(critical_rows))
        if execution_percent != prev_execution_percent:
            print('Percents are done', execution_percent)
            prev_execution_percent = execution_percent
    db.commit()


if __name__ == '__main__':
    fill_oliver()

    cursor.close()
    db.close()
