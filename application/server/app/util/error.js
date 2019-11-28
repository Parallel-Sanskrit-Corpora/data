let moduleName = 'ErrorModule';

module.exports = function () {
  return {
    sendErrorFunction: function (res) {
      return function (err) {
        let infos = errorInfo(err);
        console.log(moduleName + ' - Sending error with infos: ' + JSON.stringify(infos));
        console.log('infos.message', err);
        res.status(infos.status).send({
          error: infos.message
        });
      };
    }
  };
};

let statuses = {
  400: /(Bad request|no update|duplicate entry|required)/i,
  403: /Forbidden/i,
  404: /Not found/i
};

function errorInfo(err) {
  if (!err) {
    return {
      status: 500,
      message: 'Unknown error'
    };
  }

  let infos = {
    status: 500,
    message: err.toString().replace('Error: ', '')
  };

  for (let status in statuses) {
    if (statuses[status].test(infos.message)) {
      infos.status = status;
      return infos;
    }
  }

  return infos;
}
