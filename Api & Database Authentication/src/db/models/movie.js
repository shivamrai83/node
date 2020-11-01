const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "movies",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      movie_name: {
        defaultValue: "name",
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      language: {
        defaultValue: "language",
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      quality: {
        defaultValue: "HD",
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      rating: {
        allowNull: false,
        type: DataTypes.INTEGER(5)
      },
    },
    { timestamps: false }
  );
};
