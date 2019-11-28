let _ = require('lodash');

module.exports = function (app) {
  app.get('/verses', function (req, res) {
    const { code = null } = req.query;
    let params = {};
    let limit = 50;

    if (code) {
      const [chapter = -1, verse = -1, number = -1] = code.split('.');
      params.chapter = parseInt(chapter, 10);
      params.verse = parseInt(verse, 10);
      params.number = parseInt(number, 10);
    }

    return app.models.critical_verse.getByCode(params, limit)
      .then((result) => res.success(result))
      .catch(res.sendError);
  });

  app.get('/verse/search', function (req, res) {
    const { query = null } = req.query;
    let params = {};
    let limit = 1000;
    let promise;

    if (query !== null) {
      params.query = query;
    }

    if (app.util.utils.isCyrillic(params.query)) {
      promise = app.models.critical_verse.getByTranslation(params, limit);
    } else {
      promise = app.models.critical_verse.getBySanskrit(params, limit);
    }

    return promise
      .then((result) => res.success(result))
      .catch(res.sendError);
  });
};
