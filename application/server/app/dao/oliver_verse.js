module.exports = function (sequelize, DataTypes) {
  const OliverVerseModel = sequelize.define('oliver_verse', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    iast: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    split_iast: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    verse: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sentence_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date_created: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'oliver_sentence_mhb_mapping',
    timestamps: false,
    freezeTableName: true
  });

  OliverVerseModel.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    return values;
  };

  return OliverVerseModel;
};
