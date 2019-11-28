# -*- coding: utf-8 -*-
import MySQLdb
from transliterate import translit, get_available_language_codes
import requests
import json

dictionary_url = 'https://www.sanskrit-lexicon.uni-koeln.de/scans/awork/apidev/simple-search/v1.0/getword_list_1.0.php'
db = MySQLdb.connect(user="sanskrit", passwd="sanskrit", db="sanskrit", charset="utf8")
cursor = db.cursor()


def load_dict(word):
    data = {"input": "hk", "output": "roman", "dict": "mw", "key": word}
    res = requests.get(dictionary_url, params=data)
    return res


def to_latin(text):
    if text[-1:] == 'ы':
        text = text[:-1]
    text = text.replace('ьг', '')
    loaded_dictionary = []
    translited = translit(text, 'ru', reversed=True)
    final_translated = translited.lower().replace('\'j', 'y')\
        .replace('\'', 'y').replace('ja', 'ya').replace('ju', 'yu').replace('dzhnj', 'jn').replace('dzh', 'j')\
        .replace('ajs', 'ais').replace('ajn', 'ain').replace('ujo', 'uyo')

    loaded = load_dict(final_translated)
    if load_dict is not None:
        loaded_parsed = json.loads(loaded.text)
        loaded_dictionary = [result['dicthwoutput'] for result in loaded_parsed['result']]

    return loaded_dictionary


def index():
    cursor.execute("""SELECT id, name FROM names""")
    names = cursor.fetchall()

    for nameObject in names:
        name_id, name = nameObject
        latin_names = to_latin(name)
        print(name_id, name)
        name_count = len(name.split(' '))

        cursor.execute("""UPDATE names SET iast=%s, iast_count=%s  WHERE id=%s""", (
            ','.join(latin_names),
            len(latin_names),
            name_id
        ))
    db.commit()


if __name__ == '__main__':
    index()

    cursor.close()
    db.close()
