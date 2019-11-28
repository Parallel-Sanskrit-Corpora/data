module.exports = function (app) {
  app.post('/upload', function (req, res) {
    let file = req.files.file;
    if (file) {
      let apachePath = file.path.replace('../shared', '');
      if (process.env.DOCKER_ENVIRONMENT) {
        apachePath = file.path.replace('./', '');
      }

      return res.json({ success: true, filepath: apachePath });
    }

    return res.json({ success: false, filepath: '' });
  });

  /* ROUTES */
  require('./verse')(app);

  /* 404 catch */
  app.get('*', function (req, res) {
    res.status(404).send({
      message: 'Method not found'
    });
  });
};
