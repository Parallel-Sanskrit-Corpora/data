module.exports = function (app) {
  const dao = {
    critical_verse: app.sequelize.import('./critical_verse'),
    transaction_verse: app.sequelize.import('./translation_verse'),
    comment: app.sequelize.import('./comment'),
    oliver_verse: app.sequelize.import('./oliver_verse')
  };

  dao.critical_verse.belongsTo(dao.oliver_verse, { foreignKey: 'oliver_id', alias: 'oliver' });

  return dao;
};
