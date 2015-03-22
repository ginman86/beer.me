'use strict';

var Reflux        = require('reflux');
var recipeActions = require('../actions/recipeActions');
var _             = require('lodash');

var RecipeStore = Reflux.createStore({
  listenables: [recipeActions],
  getInitialState: function() {
    return this._recipes;
  },
  onUpdateRecipes: function(recipes) {
    this.updateRecipes(recipes);
  },
  updateRecipes: function(recipes) {
    this._recipes = recipes;
    this.trigger(this._recipes);
  },
  init: function() {
    this._recipes = this.getRecipes();
    this.updateRecipes(this._recipes);
  },
  getRecipes: function() {
    //database or localstorage
    return [
    {
      id: 1,
      name: "Midwestern Pale Ale",
      description: "The pride of the midwest. Bitter citra hops balanced by a malty finish.",
      category: {
        id: 1,
        name: "Pale Ales",
        description: "Pale ale is a beer made by warm fermentation using predominantly pale malt."
      },
      rating: 4,
      brewed: false,
      favorite: true
    },
    {
      id: 2,
      name: "Smoky Porter",
      description: "A tasty treat, straight out of the campfire",
      category: {
        id: 2,
        name: "Porters",
        description: "Porter is a dark style of beer developed in London from " +
          "well-hopped beers made from brown malt. The name was first recorded " +
          "in the 18th century, and is thought to come from its popularity with street and river porters."
      },
      rating: 3,
      brewed: true,
      favorite: true
    },
    {
      id: 3,
      name: "Stag",
      description: "Not for beginners.",
      category: {
        id: 3,
        name: "Lagers",
        description: "Lager (German: storage) is a type of beer that is fermented and conditioned at low temperatures." +
        " Pale lager is the most widely consumed and commercially available style of beer in the world"
      },
      rating: 1,
      brewed: false,
      favorite: false
    }]
  }
});



module.exports = RecipeStore;
