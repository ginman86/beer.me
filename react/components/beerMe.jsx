'use strict';

var React       = require('react');
var Reflux      = require('reflux');
var Splash      = require('./splash.jsx');
var MainTopNav  = require('./mainTopNav.jsx');
var MainSideNav = require('./mainSideNav.jsx');
var RecipeList  = require('./recipeList.jsx');

var BeerMe = React.createClass({
  render: function() {
    return (
      <div>
        <MainTopNav></MainTopNav>
        <MainSideNav></MainSideNav>
        <RecipeList></RecipeList>
      </div>);
  }
});

module.exports = BeerMe;
