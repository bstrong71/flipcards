'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    deckId: DataTypes.INTEGER
  }, {});

  Card.associate = function(models) {
    Card.belongsTo(models.Deck, {
      as: 'Decks',
      foreignKey: 'deckId'
    })
  }

  return Card;
};
