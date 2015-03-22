'use strict';

var Reflux   = require('reflux');
var _        = require('lodash');

var IngredientActions = Reflux.createActions([
  'addIngredient',
  'removeIngredient',
  'editIngredient',
  'updateIngredients'
]);

module.exports = IngredientActions;
