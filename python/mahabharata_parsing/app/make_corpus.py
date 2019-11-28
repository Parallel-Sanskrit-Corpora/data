# -*- coding: utf-8 -*-
import MySQLdb
import re
import nltk
import pymorphy2
from indic_transliteration import sanscript
from indic_transliteration.sanscript import transliterate
from transliterate import translit, get_available_language_codes
import requests
import json
from difflib import SequenceMatcher

dictionary = dict()
directory_pdf = './../html'
dictionary_url = 'https://www.sanskrit-lexicon.uni-koeln.de/scans/awork/apidev/simple-search/v1.0/getword_list_1.0.php'
morph = pymorphy2.MorphAnalyzer()

db = MySQLdb.connect(user="sanskrit", passwd="sanskrit", db="sanskrit", charset="utf8")
cursor = db.cursor()


def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()


def get_range_string(range):
    result = ''
    range_parts = range.split('—')
    if len(range_parts) > 1:
        result = range
    return result


def to_devanagari(string):
    if string is not None:
        return transliterate(string, sanscript.ITRANS, sanscript.DEVANAGARI)
    else:
        return ''


def get_comment(comments, chapter, number):
    result = False
    if result is False:
        for comment in comments:
            id, volume, fromValue, toValue, index, text, date = comment

            if chapter >= fromValue and chapter <= toValue and int(number) == index:
                result = text
    return [number, result]


def word_count_func(input_string):
    words = input_string.split()
    return len(words)


def wrap_author(input_string, input_class):
    result = input_string
    translation_parts = result.split('<br>')
    if len(translation_parts) > 0:
        author = translation_parts[0]
        author_word_count = word_count_func(author)
        if author_word_count < 5 and (author.find('uvāc') > 0 or author.find('сказал') > 0):
            translation_parts[0] = ('<span class="#class">' + author + "</span>").replace('#class', input_class)
        result = '<br>'.join(translation_parts)
    return result


def match_words(word_source, words):
    for word in words:
        name_translation = word[0]
        name_iast = word[1]
        percent = similar(name_translation, word_source)
        if percent > 0.8 and name_iast:
            iast = name_iast.split(',')[0]
            return [percent, word_source, name_translation, iast]
    return None


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

    if final_translated in dictionary:
        loaded_dictionary = dictionary[final_translated]
    else:
        loaded = load_dict(final_translated)
        if load_dict is not None:
            loaded_parsed = json.loads(loaded.text)
            loaded_dictionary = [result['dicthwoutput'][:-1] for result in loaded_parsed['result']]
            dictionary[final_translated] = loaded_dictionary

        if len(loaded_dictionary) == 0:
            print('EMPTY: ', text, translited, final_translated)

    return loaded_dictionary


def build_full_html(rows, comments, name_rows):
    full_html_fp = open(directory_pdf + '/aranyakaparva_corpus.html', 'w', encoding='utf8')

    full_html = '<html>' \
                '<head>' \
                '<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />' \
                '<link rel="stylesheet" href="./style.css"></head>' \
                '<body><div class="headers"><div class="header header_1">Махабхарата</div>' \
                '<div class="header header_2">Книга третья</div>' \
                '<div class="header header_3">Лесная (Араньяпарва)</div><div style="height: 30px"></div>' \
                '<div class="header header_4">Перевод с санскрита, предисловие и комментарий</div>' \
                '<div class="header header_5">Я. В. Василькова И С. Л. Невелевой</div>' \
                '<div class="header header_year">Москва ♦ 1987</div>' \
                '<div class="header_annotation"><span class="annotation_item">Третья книга древнеиндийского эпоса ' \
                '"Махабхарата" содержит многочисленные героические и лирические сказания, послужившие основой различных ' \
                'форм и жанров индийской литературы от раннего средневековья до нового времени. "Дидактическая" поэзия ' \
                'книги перекликается с политико-юридическими и философскими памятниками древности.</span>' \
                '<span class="annotation_item">Перевод сопровождается обширными комментариями.</span></div>'

    data_to_export = dict()
    names = [[name_row[1], name_row[5]] for name_row in name_rows]
    from_value = 0

    for row in rows:
        iast = row[6]
        translation = row[0]
        chapter = row[2]
        range = row[5]

        if range is not None:
            range_parts = range.split('—')
            from_value = int(range_parts[0])

        chapter_key = 'chapter-' + str(chapter)
        verse_key = str(chapter) + '.' + str(from_value)

        if chapter_key in data_to_export:
            chapter_object = data_to_export[chapter_key]
        else:
            chapter_object = {
                "data": dict(),
                "chapter": chapter
            }

        if verse_key in chapter_object['data']:
            verse = chapter_object['data'][verse_key]
        else:
            verse = {
                "iast": [],
                "translation": translation,
                "range": '(' + range + ')'
            }

        verse['iast'].append(iast)
        chapter_object['data'][verse_key] = verse
        data_to_export[chapter_key] = chapter_object

    # contents
    full_html += '<div class="content_splitter"></div>'
    full_html += '<div class="content_header"></div>'
    full_html += '<div class="contents">'
    for key in data_to_export:
        chapter_item = data_to_export[key]
        full_html += '<div class="content_item"><div class="content_title"><a href="#chapter_#chapter_digit">' \
                     'Глава #chapter_digit</a></div>'.replace('#chapter_digit', str(chapter_item['chapter'])) + '</div>'
    full_html += '</div>'

    # Chapters
    full_html += '<div class="chapter_splitter"></div>'
    full_html += '<div class="chapters">'

    full_html_fp.write(full_html)
    full_html_fp.close()

    for key in data_to_export:
        full_html_fp = open(directory_pdf + '/aranyakaparva_corpus.html', 'a+', encoding='utf8')
        chapter_item = data_to_export[key]
        chapter = chapter_item['chapter']
        print('chapter', chapter)
        full_html = '<div class="chapter"><div class="chapter_title" id="chapter_#chapter">Глава #chapter</div>'.replace('#chapter', str(chapter_item['chapter']))
        if chapter > 0:
            for key_inner in chapter_item['data']:
                verse_item = chapter_item['data'][key_inner]
                full_html += '<div class="range">#range</div>'.replace('#range', get_range_string(verse_item['range']))
                full_html += '<div class="chapter_content">'

                translation = verse_item['translation']
                iast = '<br>'.join(verse_item['iast'])

                text_parts = translation.split('<br>')
                if len(text_parts) > 1:
                    text = text_parts[1]
                else:
                    text = text_parts[0]

                tokenized_text = nltk.word_tokenize(text, language="russian")
                # for word in tokenized_text:
                #     match_result = match_words(word, names)
                #     # print(match_result)
                #     if match_result is not None:
                #         translation = translation.replace(word, '<span class="person_translation">' + word + '</span>')
                        # for latin_word in latin_words:
                        #     if len(latin_word) > 3:
                        #         iast = iast.replace(latin_word, '<span class="person_iast">' + latin_word + '</span>')

                iast = wrap_author(iast, 'iast_author')
                iast = iast.replace('\'', '’')
                full_html += '<div class="chapter_block iast">' + iast + '</div>'

                translation = translation.replace(' ,', ',').replace(' ;', ';')
                translation = wrap_author(translation, 'translation_author')

                numbers = re.findall(r'\d+', translation)

                found_comments = [get_comment(comments, chapter, number) for number in numbers]

                translation = re.sub("\s\((\d+)\)", r"<a href='#comment_#chapter_\g<1>' class='comment_sub'><sup><small>\g<1></small></sup></a>", translation).replace('#chapter', str(chapter))
                final_translation = re.sub("\s(\d+)", r"<a href='#comment_#chapter_\g<1>' class='comment_sub'><sup><small>\g<1></small></sup></a>", translation).replace('#chapter', str(chapter))

                full_html += '<div class="chapter_block translation">' + final_translation + '</div>'
                full_html += '</div>'
                full_html += '<div class="comments">'
                if len(found_comments) > 0:
                    for comment in found_comments:
                        if comment[1] is not False:
                            full_html += '<div class="comment_item" id="#comment_#chapter_#comment_number"><span class="comment_number">#comment_number</span> - <span class="comment_text">#comment_text</span></div>'.replace('#comment_number', str(comment[0])).replace('#comment_text', comment[1]).replace('#chapter', str(chapter))
                full_html += '</div>'
        full_html += '</div>'
        full_html_fp.write(full_html)
        full_html_fp.close()

    full_html_fp = open(directory_pdf + '/aranyakaparva_corpus.html', 'a+', encoding='utf8')
    full_html = '</div></body></html>'
    full_html_fp.write(full_html)
    full_html_fp.close()


def index():
    cursor.execute("""SELECT a.text, a.code, a.chapter, a.verse, a.title, a.range_value, ic.iast FROM 
    aranyakaparva a LEFT JOIN iast_critical ic ON a.code=ic.code""")
    rows = cursor.fetchall()
    cursor.execute("""SELECT * FROM comments WHERE volume=3""")
    comments = cursor.fetchall()
    cursor.execute("""SELECT * FROM names""")
    names = cursor.fetchall()
    build_full_html(rows, comments, names)
    pass


if __name__ == '__main__':
    index()

    cursor.close()
    db.close()
