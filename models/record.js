module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('record', {
    dataHash: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('owner', val.toLowerCase());
      }
    },
    metadata: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dataUri: {
      type: DataTypes.STRING,
      allowNull: false
    },
    irisScore: DataTypes.INTEGER,
    sigCount: DataTypes.INTEGER
  }, {
    indexes: [
      {
        unique: false,
        fields: ['owner']
      },
      {
        unique: true,
        fields: ['dataHash']
      },
    ]
  });

  return Record;
};
