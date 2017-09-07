'use strict';
module.exports = function(sequelize, DataTypes) {
  var Deck = sequelize.define('Deck', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});

  Deck.associate = function(models) {
    Deck.belongsTo(models.User, {
      as: 'Users',
      foreignKey: 'userId'
    })
    Deck.hasMany(models.Card, {
      as: 'Cards',
      foreignKey: 'deckId'
    })
  }

  return Deck;
};
