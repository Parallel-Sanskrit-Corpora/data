module.exports = function (app) {
  return function (req, res, next) {
    res.sendError = app.util.error.sendErrorFunction(res);
    let originSend = res.send;
    let originJson = res.json;

    res.send = function (body) {
      let ctx = this;
      originSend.call(ctx, body);
    };

    res.success = function (body) {
      let ctx = this;
      originJson.call(ctx, {
        success: true,
        error: null,
        result: body
      });
    };

    res.failed = function (body) {
      let ctx = this;
      originJson.call(ctx, {
        success: false,
        error: body,
        result: null
      });
    };
    next();
  };
};
