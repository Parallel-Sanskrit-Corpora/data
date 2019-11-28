module.exports = function () {
  return function (req, res, next) {
    /* TODO: check if the user is allowed to go further */
    next();
  };
};
