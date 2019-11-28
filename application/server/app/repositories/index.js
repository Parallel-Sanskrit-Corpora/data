module.exports = function (app) {
  const repositories = {
    verse: require('./verse')(app)
  };

  return repositories;
};
