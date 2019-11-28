module.exports = function (sequelize, DataTypes) {
  const CriticalVerseModel = sequelize.define('critical_verse', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    devanagari: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    iast: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    oliver_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      references: {
        model: 'oliver_verse',
        key: 'id'
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    volume: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    chapter: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    verse: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_created: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'iast_critical',
    timestamps: false,
    freezeTableName: true
  });

  CriticalVerseModel.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    return values;
  };

  return CriticalVerseModel;
};
