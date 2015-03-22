'use strict';

var Reflux   = require('reflux');
var _        = require('lodash');

var RecipeActions = Reflux.createActions([
  'addRecipe',
  'removeRecipe',
  'editRecipe',
  'updateRecipes'
]);

module.exports = RecipeActions;
