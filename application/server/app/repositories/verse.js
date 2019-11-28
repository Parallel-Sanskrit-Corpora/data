module.exports = function (app) {
  return {
    getParallels: getParallels
  };

  function getParallels(sentenceId) {
    let query = 'SELECT sp.sentence_id, sm.iast, cm.chapter_name, sm.verse, sm.number FROM `oliver_sentence_parallel` sp ';
    query += 'LEFT JOIN oliver_sentence_mapping sm ON sm.sentence_id=sp.sentence_parallel_id ';
    query += 'LEFT JOIN oliver_chapter_mapping cm ON sm.chapter_id=cm.value ';
    query += 'WHERE sp.sentence_id=? ';

    return app.sequelize.query(query, {
      replacements: [sentenceId],
      type: app.sequelize.QueryTypes.SELECT
    });
  }
};
