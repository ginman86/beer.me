'use strict';

var Reflux          = require('reflux');
var CategoryActions = require('../actions/categoryActions');
var Storage         = require('./localStore');
var _               = require('lodash');

var CategoryStore = Reflux.createStore({
  listenables: [CategoryActions],
  getInitialState: function() {
    return this._categories;
  },
  onUpdateCategories: function(categories) {
    this.updateCategories(categories);
  },
  updateCategories: function(categories) {
    this._categories = categories;
    this.trigger(this._categories);
  },
  init: function() {
    this.getCategories(function(categories) {
      this.updateCategories(categories);
    }.bind(this));
  },
  getCategories: function(callback) {
    //currently not mutable due to aggregation concerns and limitations locally.
    Storage.getItem('categories', function(err, value) {
      if (!err && value !== null) {
        this._categories = value;

        callback(value);
      } else {
        Storage.setItem('categories', this.getCategoriesSeed(), function(err, value) {
          if (!err) {
            console.log("Categories successfully seeded.");
            this._categories = value;
          } else {
            console.error("Error seeding categories");
          }
        })
      }
    }.bind(this));
  },
  getCategoriesSeed: function() {
    return [
    {
      id: 1,
      name: "Pale Ales",
      description: "Pale ale is a beer made by warm fermentation using predominantly pale malt."
    },
    {
      id: 2,
      name: "Porters",
      description: "Porter is a dark style of beer developed in London from " +
        "well-hopped beers made from brown malt. The name was first recorded " +
        "in the 18th century, and is thought to come from its popularity with street and river porters."
    },
    {
      id: 3,
      name: "Lagers",
      description: "Lager (German: storage) is a type of beer that is fermented and conditioned at low temperatures." +
      " Pale lager is the most widely consumed and commercially available style of beer in the world"
    }]
  }
});



module.exports = CategoryStore;
