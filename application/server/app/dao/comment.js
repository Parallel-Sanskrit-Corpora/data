module.exports = function (sequelize, DataTypes) {
  const CommentModel = sequelize.define('comment', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    volume: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'comments',
    timestamps: false,
    freezeTableName: true
  });

  CommentModel.prototype.toJSON = function () {
    let values = Object.assign({}, this.get());
    return values;
  };

  return CommentModel;
};
