'use strict';

var React         = require('react');
var Reflux        = require('reflux');
var _             = require('lodash');
var Bs            = require('react-bootstrap');
var Router        = require('react-router');

var ListGroup     = Bs.ListGroup;
var Glyphicon     = Bs.Glyphicon;
var State         = Router.State;

var RecipeActions  = require('../actions/recipeActions');
var RecipeStore    = require('../stores/recipeStore');

var RecipeDetail   = require('./recipeDetail.jsx');
var RecipeListItem = require('./recipeListItem.jsx');

var RecipeList = React.createClass({
  mixins: [Reflux.connect(RecipeStore,'recipes'), State],
  filterRecipes: function() {
    var recipes = this.state.recipes,
        filters = this.getQuery(),
        filtered = recipes;

    if (filters !== null && filters !== undefined && !_.isEmpty(filters)) {
      filtered = _.select(recipes, function(recipe) {
        var show = false;

        for(var filter in filters) {
          if (recipe[filter] !== undefined &&
            recipe[filter] == !!filters[filter]) { //booleanify

            show = true;
            break;
          }
        }

        return show;
      });
    }

    return filtered;
  },
  getRecipe: function(id) {
    var recipes = this.state.recipes,
        recipe;

    if (id !== undefined && id !== null) {
      recipe = _.select(recipes, function(curRecipe) {
        return curRecipe.id == id;
      });
    }

    return recipe;
  },
  renderContent: function() {
    var content,
        recipes = this.state.recipes,
        recipeId = this.props.params.recipeId;

    //id specified, get individual recipe
    if (recipeId !== undefined) {
      recipes = this.getRecipe(recipeId);
    } else { //list page, apply any filters
      recipes = this.filterRecipes();
    }

    content = this.renderRecipeContent(recipes);

    return content;
  },
  renderRecipeContent: function(recipes) {
    var content;

    if(recipes && recipes.length > 0) {
      //single result, render a detail
      if (recipes.length === 1) {
        var recipe = recipes[0];

        content = (
          <RecipeDetail name={recipe.name} description={recipe.description}
          category={recipe.category} id={recipe.id}/>
        );
      } else if (recipes.length > 1) {
      //multiple results, render a list.
        content = _.map(recipes, function(recipe) {
          return(
            <RecipeListItem header={recipe.name} id={recipe.id}
            category={recipe.category} rating={recipe.rating}/>
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

