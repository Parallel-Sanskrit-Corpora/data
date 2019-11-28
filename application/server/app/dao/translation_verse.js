module.exports = function (sequelize, DataTypes) {
  const TranslationVerseModel = sequelize.define('translation_verse', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true
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
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    from_value: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    to_value: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    range_value: {
      type: DataTypes.STRING,
      allowNull: true
    },
    date_created: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'aranyakaparva',
    timestamps: false,
    freezeTableName: true
  });

  TranslationVerseModel.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    return values;
  };

  return TranslationVerseModel;
};
