'use strict';

var Reflux          = require('reflux');
var RecipeActions   = require('../actions/recipeActions');
var CategoryStore   = require('./categoryStore');
var Storage         = require('./localStore');
var _               = require('lodash');

var RecipeStore = Reflux.createStore({
  listenables: [RecipeActions],
  getInitialState: function() {
    return this._recipes;
  },
  onSaveRecipe: function(updatedRecipe, callback) {
    var originalIndex = null;

    //remove if found, then push new.
    _.each(this._recipes, function(recipe, i) {
      if (recipe.id === updatedRecipe.id) {
        originalIndex = i;
        return false;
      }
    });

    if (originalIndex !== null) {
      this._recipes[originalIndex] = updatedRecipe;
    } else {
      this._recipes.push(updatedRecipe);
    }

    Storage.setItem('recipes', this._recipes, function(err,value) {
      console.log("Saved recipes. Error? ", err);
      if (callback) callback();
    })
  },
  onUpdateRecipes: function(recipes) {
    this.updateRecipes(recipes);
  },
  onAddRecipe: function(callback) {
    var id = this.getNewId();

    this.onSaveRecipe({
      id: id,
      name: "",
      description: "",
      categoryId: null,
      category: {},
      rating: null,
      brewed: false,
      favorite: false
    });

    callback(id);
  },
  updateRecipes: function(recipes) {
    this._recipes = recipes;
    this.trigger(this._recipes);
  },
  init: function() {
    this.listenTo(CategoryStore, this.onCategoriesUpdated, this.onCategoriesUpdated);

    this.getRecipes(function(recipes) {
      var hydratedRecipes = this.hydrateRecipes(recipes);

      this.updateRecipes(hydratedRecipes);
    }.bind(this));
  },
  onCategoriesUpdated: function(categories) {
    var hydrated;

    this._categories = categories;
    hydrated = this.hydrateRecipes(this._recipes);

    this.updateRecipes(hydrated);
  },
  hydrateRecipes: function(recipes) {
    var hydrated = [];

    _.each(recipes, function(recipe) {
      recipe.category = _.find(this._categories, function(category) {
        return category.id === recipe.categoryId;
      });
      hydrated.push(recipe);
    }.bind(this));

    return hydrated;
  },
  getNewId: function() {
    return _.max(this._recipes, 'id').id + 1;
  },
  getRecipes: function(callback) {
    Storage.getItem('recipes', function(err, value) {
      if (!err && value !== null) {
        callback(value);
      } else {
        Storage.setItem('recipes', this.getRecipeSeed(), function(err, value) {
          if (!err) {
            console.log("Recipes successfully seeded.");
            callback(value);
          } else {
            console.error("Error seeding recipes");
          }
        })
      }
    }.bind(this));
  },
  getRecipeSeed: function() {
    return [
    {
      id: 1,
      name: "Midwestern Pale Ale",
      description: "The pride of the midwest. Bitter citra hops balanced by a malty finish.",
      categoryId: 1,
      rating: 4,
      brewed: false,
      favorite: true
    },
    {
      id: 2,
      name: "Smoky Porter",
      description: "A tasty treat, straight out of the campfire",
      categoryId: 2,
      rating: 3,
      brewed: true,
      favorite: true
    },
    {
      id: 3,
      name: "Stag",
      description: "Not for beginners.",
      categoryId: 3,
      rating: 1,
      brewed: false,
      favorite: false
    }];
  }
});

module.exports = RecipeStore;