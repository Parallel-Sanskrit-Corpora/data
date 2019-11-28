module.exports = function (sequelize, DataTypes) {
  const OliverVerseParallelModel = sequelize.define('oliver_verse_parallel', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    sentence_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      references: {
        model: 'oliver_verse',
        key: 'id'
      }
    },
    sentence_parallel_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      references: {
        model: 'oliver_verse',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'oliver_sentence_parallel',
    timestamps: false,
    freezeTableName: true
  });

  OliverVerseParallelModel.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    return values;
  };

  return OliverVerseParallelModel;
};
