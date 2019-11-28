# -*- coding: utf-8 -*-
import MySQLdb
import os
import re
from indic_transliteration import sanscript
from indic_transliteration.sanscript import SchemeMap, SCHEMES, transliterate

directory_critical_text = './../../critical_itx'

db = MySQLdb.connect(user="sanskrit", passwd="sanskrit", db="sanskrit", charset="utf8")
cursor = db.cursor()


def to_iast(string):
    return transliterate(string, sanscript.ITRANS, sanscript.IAST)


def to_devanagari(string):
    return transliterate(string, sanscript.ITRANS, sanscript.DEVANAGARI)


def get_volume(index):
    return '0' + str(index) if index < 10 else (str(index) if index < 100 else str(index))


def get_chapter(index):
    return '00' + str(index) if index < 10 else ('0' + str(index) if index < 100 else str(index))


def get_chapter_info(chapter_info_content):
    info = {}

    if len(chapter_info_content) > 0:
        element = (chapter_info_content[0]).strip()
        matched = re.match('(\|\|(\s)+(\d)+\|\|)', element)
        if matched:
            info['volume'] = int(matched.group(1))
            info['chapter'] = int(matched.group(2))
            info['verse'] = int(matched.group(3))

    return info


def index():
    files = os.listdir(directory_critical_text)
    length = len(files)

    for fileIndex in range(length):
        volume = fileIndex + 1

        print('Started volume: ' + str(volume))
        filename = 'mbh' + get_volume(volume) + '.itx.txt'
        filePath = os.path.join(directory_critical_text, filename)
        if filename in files and os.path.isfile(filePath) is True and volume == 3:
            f = open(filePath, "r")
            is_readable = False
            verse_dict = dict()
            current_verses = []
            verse_number = 0
            current_chapter = False
            for string in f:
                try:
                    index = string.index('\itxtitle')
                    if index == 0:
                        is_readable = True
                except ValueError:
                    pass

                try:
                    index = string.index('##')
                    if index == 0:
                        is_readable = False
                except ValueError:
                    pass

                strip_string = string.strip().replace('|| ', '||')
                if len(strip_string) > 0 and is_readable and strip_string[0] != '\\':
                    if len(strip_string) < 5:
                        current_chapter = int(strip_string)
                    elif current_chapter is not False:
                        matched = re.findall(r'(\d+)', strip_string)
                        # sub_string = re.sub('\|\|\d+\|\|', '', strip_string).replace('|', '').strip()
                        sub_string = strip_string.strip()

                        if len(matched) > 0:
                            verse_number = int(matched[0])

                            verse_key = str(volume) + '.' + get_chapter(current_chapter) + '.' + get_chapter(verse_number)

                            if verse_key in verse_dict:
                                verse = verse_dict[verse_key]
                            else:
                                verse = {
                                    "verses": [],
                                    "verse_key": verse_key,
                                    "len": 0,
                                    "volume": volume,
                                    "current_chapter": current_chapter,
                                    "verse_number": verse_number
                                }

                            if len(current_verses) > 0:
                                for item in current_verses:
                                    verse['verses'].append(item)
                            current_verses = []
                            verse['verses'].append(sub_string)
                            verse_dict[verse_key] = verse
                        else:
                            current_verses.append(sub_string)
                elif len(strip_string) > 0 and is_readable and len(current_verses) > 0 and strip_string == '\hrule':
                    verse_number_alt = verse_number + 1
                    verse_key = str(volume) + '.' + get_chapter(current_chapter) + '.' + get_chapter(verse_number_alt)
                    if verse_key in verse_dict:
                        verse = verse_dict[verse_key]
                    else:
                        verse = {
                            "verses": [],
                            "verse_key": verse_key,
                            "len": 0,
                            "volume": volume,
                            "current_chapter": current_chapter,
                            "verse_number": verse_number_alt
                        }

                    current_verses[len(current_verses) - 1] = current_verses[len(current_verses) - 1] + '|' + str(verse_number_alt) + '||'

                    for item in current_verses:
                        verse['verses'].append(item)
                    current_verses = []
                    verse_dict[verse_key] = verse
                    pass
                elif len(strip_string) > 0 and is_readable and len(current_verses) > 0 and strip_string == '\medskip':
                    current_verses = []
                    pass
            data_to_insert = []
            for verse_key in verse_dict:
                verse = verse_dict[verse_key]
                for item_index, verse_item in enumerate(verse['verses']):
                    iast_verse = to_iast(verse_item)
                    devanagari_verse = to_devanagari(verse_item)

                    data_to_insert.append(
                        [
                            devanagari_verse,
                            iast_verse,
                            verse_key,
                            verse['volume'],
                            verse['current_chapter'],
                            verse['verse_number'],
                            (item_index + 1)
                        ]
                    )
                # cursor.execute("""UPDATE aranyakaparva SET devanagari=%s, iast=%s, verse=%s WHERE code=%s""", (devanagari_verses, iast_verses, verse['verse_number'], verse_key))
            cursor.executemany("""INSERT INTO iast_critical (devanagari, iast, code, volume, chapter, verse, number) VALUES (%s, %s, %s, %s, %s, %s, %s)""", data_to_insert)

            db.commit()
    pass


if __name__ == '__main__':
    index()

    # cursor.execute("""UPDATE aranyakaparva SET verse=0""")
    # db.commit()

    cursor.close()
    db.close()
