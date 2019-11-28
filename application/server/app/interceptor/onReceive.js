module.exports = function () {
  return function (req, res, next) {
    req.timestampReceive = new Date().getTime();
    req.start = (new Date()).getTime();
    next();
  };
};
