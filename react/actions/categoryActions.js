'use strict';

var Reflux   = require('reflux');
var _        = require('lodash');

var CategoryActions = Reflux.createActions([
  'addCategory',
  'removeCategory',
  'editCategory',
  'updateCategories'
]);

module.exports = CategoryActions;
