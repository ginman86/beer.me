'use strict';

var Reflux          = require('reflux');
var categoryActions = require('../actions/categoryActions');
var _               = require('lodash');

var CategoryStore = Reflux.createStore({
  listenables: [categoryActions],
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
    this._categories = this.getCategories();
    this.updateCategories(this._categories);
  },
  getCategories: function() {
    //database or localstorage
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
