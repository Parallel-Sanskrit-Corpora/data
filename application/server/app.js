let conf = require('./config/conf');

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multipart = require('connect-multiparty');
const path = require('path');
const _ = require('lodash');
const compression = require('compression');
const os = require('os');


let app = express();
app.q = require('q');
app.constants = require('./config/constants');

/* PARSERS */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(multipart({ uploadDir: conf.directories.uploads }));
app.use(compression({ filter: require('./app/interceptor/onCompress')() }));
app.use(cors());

app.set('superSecret', conf.secret);

/* INTERCEPTOR ON RECEIVE/ON SEND */
app.use('*', require('./app/interceptor/onRequest')(app, conf));
app.use(require('./app/interceptor/onReceive')(app));
app.use(require('./app/interceptor/onSend')(app));

/* LOGGER */
app.logger = require('./app/logger')(app, conf);
app.logger.info(`Booting ${conf.application_name}`);
app.util = require('./app/util')(app);

app.sequelize = require('./app/connection/sequelize')(app, conf);
app.dao = require('./app/dao')(app);
app.models = require('./app/models')(app);
app.repositories = require('./app/repositories')(app);

require('./app/route')(app, conf);

let server = app.listen(conf.port, function () {
  let host = server.address().address;
  let port = server.address().port;

  app.logger.info(`NodeJS app | successfully | started. Listening on http://${host}:${port}`);
});
