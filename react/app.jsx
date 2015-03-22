'use strict';

var React           = require('react');
var Reflux          = require('reflux');
var Router          = require('react-router');

var RouteHandler    = Router.RouteHandler;
var Route           = Router.Route;
var DefaultRoute    = Router.DefaultRoute;

var MainTopNav      = require('./components/mainTopNav.jsx');
var MainSideNav     = require('./components/mainSideNav.jsx');
var Recipes         = require('./components/recipeList.jsx');
var RecipeDetail    = require('./components/recipeDetail.jsx');
var Anchor          = document.getElementById('beer-me-anchor');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <MainTopNav></MainTopNav>
        <MainSideNav></MainSideNav>
        <RouteHandler {...this.props}/>
      </div>);
  }
});

var Routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="recipes" handler={Recipes}>
      <Route name="detail" path=":recipeId" handler={RecipeDetail}/>
    </Route>
    <DefaultRoute handler={Recipes}/>
  </Route>
);

Router.run(Routes, function (Handler, state) {
  var params = state.params;
  React.render(<Handler params={params}/>, Anchor);
});

