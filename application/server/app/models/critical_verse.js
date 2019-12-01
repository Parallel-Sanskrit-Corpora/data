const _ = require('lodash');
const sequelize = require('sequelize');
const stringSimilarity = require('string-similarity');

module.exports = function (app) {
  const Op = sequelize.Op;

  return {
    getByCode,
    getBySanskrit,
    getByTranslation
  };

  function getByCode(codes, limit = 100) {
    const condition = {};

    _.forEach(codes, (codeValue, codeKey) => {
      if (codeValue > -1) {
        condition[codeKey] = codeValue;
      }
    });

    console.log('condition', condition);

    return app.dao.critical_verse.findAll({
      where: condition,
      limit: limit,
      include: [
        {
          model: app.dao.oliver_verse,
          required: false
        }
      ]
    }).then((verses) => {
      const promises = [];

      verses.forEach((verseItem) => {
        const { chapter, verse } = verseItem;
        promises.push(app.dao.transaction_verse.findOne({
          where: {
            chapter: chapter,
            [Op.or]: [
              {
                range_value: verse
              },
              {
                from_value: {
                  [Op.lte]: verse
                },
                to_value: {
                  [Op.gte]: verse
                }
              }
            ],
            text: {
              [Op.not]: null
            }
          }
        }));
      });

      return app.q.all(promises)
        .then((transactionVerses) => {
          return getFullResponseByTranslation(transactionVerses);
        });
    });
  }

  function getBySanskrit(params, limit = 100) {
    const condition = {};

    if (params.query) {
      condition.iast = {
        [Op.substring]: params.query
      };
    }

    return app.dao.critical_verse.findAll({
      where: condition, limit: limit
    }).then((verses) => {
      const promises = [];

      verses.forEach((verseItem) => {
        const { chapter, verse } = verseItem;
        promises.push(app.dao.transaction_verse.findOne({
          where: {
            chapter: chapter,
            from_value: {
              [Op.lte]: verse
            },
            text: {
              [Op.not]: null
            },
            to_value: {
              [Op.gte]: verse
            }
          }
        }));
      });

      return app.q.all(promises)
        .then((transactionVerses) => {
          return getFullResponseByTranslation(transactionVerses);
        });
    });
  }

  function getByTranslation(params, limit = 100) {
    const condition = {};

    if (params.query) {
      condition.text = {
        [Op.substring]: params.query
      };
    }

    return app.dao.transaction_verse.findAll({
      where: condition, limit: limit
    }).then((transactionVerses) => {
      return getFullResponseByTranslation(transactionVerses);
    });
  }

  // /////////////////////////////////////////////////
  function getFullResponseByTranslation(transactionVerses) {
    let usedIds = [];
    const responsePromises = [];

    transactionVerses.forEach((transactionVerse) => {
      if (transactionVerse) {
        const {
          id, chapter, from_value: fromValue, to_value: toValue, range_value: rangeValue
        } = transactionVerse;
        const condition = {
          chapter: chapter
        };

        if (fromValue !== toValue) {
          condition.verse = {
            [Op.between]: [fromValue, toValue]
          };
        } else {
          condition.verse = rangeValue;
        }

        if (usedIds.indexOf(id) === -1) {
          usedIds.push(id);
          responsePromises.push(app.dao.critical_verse.findAll({
            where: condition,
            include: [
              {
                model: app.dao.oliver_verse,
                required: false
              }
            ]
          }));
        }
      }
    });

    return app.dao.comment.findAll({
        where: {
          volume: 3
        }
    })
      .then((comments) => {
        const commentDictionary = {};

        comments.forEach((comment) => {
          commentDictionary[comment.number] = comment.text;
        });

        return app.q.all(responsePromises)
          .then((responseVerses) => {
            const response = [];
            let usedVersesIds = [];

            transactionVerses.forEach((transactionVerse, verseIndex) => {
              if (transactionVerse && usedVersesIds.indexOf(transactionVerse.id) === -1) {
                const {
                  text, chapter, from_value: fromValue, to_value: toValue, range_value: rangeValue
                } = transactionVerse;
                const responseItem = { translation: [transactionVerse], sanskrit: [] };

                const noteRegExp = RegExp('(\\d+)', 'gm');
                const commentNumbers = [];
                let matches;

                while ((matches = noteRegExp.exec(text)) !== null) {
                  commentNumbers.push(parseInt(matches[0], 10));
                }

                responseItem.comments = [];

                commentNumbers.forEach((commentNumber) => {
                  if (commentNumber !== null) {
                    let comment = commentDictionary[commentNumber];
                    transactionVerses[verseIndex].text = transactionVerses[verseIndex].text
                      .replace(` (${commentNumber})`, `<span class="comment__index">${commentNumber}</span>`);
                    responseItem.comments.push({
                      number: commentNumber,
                      text: comment
                    });
                  }
                });

                responseVerses.forEach((responseItemVerses) => {
                  const firstResponseItemVerse = responseItemVerses[0];
                  if (firstResponseItemVerse && firstResponseItemVerse.chapter === chapter && firstResponseItemVerse.verse >= fromValue
                    && firstResponseItemVerse.verse <= toValue) {
                    responseItem.sanskrit = responseItemVerses;
                  } else if (firstResponseItemVerse && firstResponseItemVerse.chapter === chapter && firstResponseItemVerse.verse === parseInt(rangeValue, 10)) {
                    responseItem.sanskrit = responseItemVerses;
                  }
                });

                response.push(responseItem);
                usedVersesIds.push(transactionVerse.id);
              }
            });

            const promises = [];
            response.forEach((responseItem) => {
              responseItem.sanskrit.forEach((sanskritItem) => {
                promises.push(app.repositories.verse.getParallels(sanskritItem.oliver_verse.sentence_id));
              });
            });

            return app.q.all(promises)
              .then((parallels) => {
                const clearParallels = parallels.filter((parallel) => parallel.length > 0);

                response.forEach((responseItem, responseIndex) => {
                  responseItem.sanskrit.forEach((sanskritItem, sanskritIndex) => {
                    const parallelItems = [];

                    clearParallels.forEach((clearParallelItem) => {
                      clearParallelItem.forEach((parallelItem) => {
                        if (parallelItem.sentence_id === sanskritItem.oliver_verse.sentence_id) {
                          const similarity = stringSimilarity.compareTwoStrings(sanskritItem.oliver_verse.iast, parallelItem.iast);
                          parallelItem.similarity = parseFloat(similarity).toFixed(2);
                          parallelItems.push(parallelItem);
                        }
                      });
                    });

                    response[responseIndex].sanskrit[sanskritIndex].setDataValue('parallels', parallelItems);
                  });
                });

                console.log('response length', response.length, clearParallels);
                return response;
              });
          });
      });
  }
};
