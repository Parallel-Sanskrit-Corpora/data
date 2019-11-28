module.exports = function (app) {
  const models = {
    critical_verse: require('./critical_verse')(app)
  };

  return models;
};
