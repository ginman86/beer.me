'use strict';

var React         = require('react');
var Reflux        = require('reflux');
var _             = require('lodash');
var Bs            = require('react-bootstrap');
var ListGroup     = Bs.ListGroup;
var ListGroupItem = Bs.ListGroupItem;
var Glyphicon     = Bs.Glyphicon;

var RecipeActions  = require('../actions/recipeActions');
var RecipeStore    = require('../stores/recipeStore');

var RecipeDetail   = require('./recipeDetail.jsx');

var RecipeList = React.createClass({
  mixins: [Reflux.connect(RecipeStore,'recipes')],
  handleClick: function(arg) {
    console.log("handling click", arg);
  },
  filterRecipes: function(filter) {
    var recipes = this.state.recipes,
        filtered;

    if (filter) {
      filtered = _.select(recipes, function(recipe) {
        return recipe.id == filter;
      });
    }

    return filtered;
  },
  renderContent: function() {
    var content,
        recipes = this.state.recipes,
        recipeId = this.props.params.recipeId;

    if (recipeId !== undefined) {
      recipes = this.filterRecipes(recipeId);
    }

    if(recipes && recipes.length > 0) {
      //single result, render a detail
      if (recipes.length === 1) {
        var recipe = recipes[0];

        content = (
          <RecipeDetail name={recipe.name} description={recipe.description} category={recipe.category} id={recipe.id}/>
        );
      } else if (recipes.length > 1) {
      //multiple results, render a list.
        content = _.map(recipes, function(recipe) {
          return(
            <ListGroupItem header={recipe.name} key={recipe.id} addonBefore={<Glyphicon glyph="search" />} onClick={this.handleClick}>
              {recipe.category.name}
              <span className="rating">Rating: {recipe.rating}</span>
            </ListGroupItem>
          );
        }.bind(this));
      }
    }
    else {
      content = (
        <div>
          <h4>No recipes.</h4>
       </div>);
    }

    return content;
  },
  render: function() {
    return (
      <div className="pull-left col-md-6 col-lg-6 col-sm-6 recipe-list">
        <ListGroup>
          {this.renderContent()}
        </ListGroup>
      </div>);
  }
});

module.exports = RecipeList;

