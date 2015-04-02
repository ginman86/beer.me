'use strict';

var _                 = require('lodash');
var Reflux            = require('reflux');
var Storage           = require('./localStore');

var ingredientActions = require('../actions/ingredientActions');



const FERMENTABLE = 1,
      HOP = 2,
      YEAST = 3,
      EXTRA = 4;

var IngredientStore = Reflux.createStore({
  listenables: [ingredientActions],
  getInitialState: function() {
    return this._ingredients;
  },
  onUpdateIngredients: function(ingredients) {
    this.updateIngredients(ingredients);
  },
  updateIngredients: function(ingredients) {
    this._ingredients = ingredients;
    this.trigger(this._ingredients);
  },
  init: function() {
    this.getIngredients(function(ingredients) {
      this.updateIngredients(ingredients);
    }.bind(this));
  },
  getIngredients: function(callback) {
    Storage.getItem('ingredients', function(err, value) {
      if (!err && value !== null) {
        this._ingredients = value;

        callback(value);
      } else {
        Storage.setItem('ingredients', this.getIngredientsSeed(), function(err, value) {
          if (!err) {
            console.log("Ingredients successfully seeded.");
            this._ingredients = value;
          } else {
            console.error("Error seeding ingredients");
          }
        })
      }
    }.bind(this));
  },
  getIngredientsSeed: function() {
    //database or localstorage
    return [
    {
      id: 1,
      type: FERMENTABLE,
      name: "Caramel Pils"
    },
    {
      id: 2,
      type: FERMENTABLE,
      name: "Flaked Barley"
    },
    {
      id: 3,
      type: FERMENTABLE,
      name: "Honey"
    },
    {
      id: 4,
      type: FERMENTABLE,
      name: "Pale 2-Row"
    },
    {
      id: 5,
      type: HOP,
      name: "Apollo"
    },
    {
      id: 6,
      type: HOP,
      name: "Citra"
    },
    {
      id: 7,
      type: HOP,
      name: "Fuggle"
    },
    {
      id: 8,
      type: HOP,
      name: "Sterling"
    },
    {
      id: 9,
      type: YEAST,
      name: "Belgian Abbey Wyeast 1214"
    },
    {
      id: 10,
      type: YEAST,
      name: "Dry Belgian Ale The Yeast Bay"
    },
    {
      id: 11,
      type: YEAST,
      name: "French Saison Wyeast 3711"
    },
    {
      id: 12,
      type: YEAST,
      name: "Vermont Ale The Yeast Bay"
    }]
  }
});



module.exports = IngredientStore;
