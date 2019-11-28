const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const configurationModules = [
  'database', 'directories', 'logging'
];

const configuration = {
  application_name: 'corpus_mahabharata',
  production: true,
  port: '3000',
  https: false,
  secret: 'Xoyph0i11fWtvma19wRUtFNvbuJgqox4'
};

_.forEach(configurationModules, (moduleName) => {
  const filePath = path.resolve(`./config/configuration-modules/${moduleName}.js`);
  const module = fs.existsSync(filePath) ? require(filePath) : null;

  if (module) {
    configuration[moduleName] = module;
  }
});

module.exports = configuration;
