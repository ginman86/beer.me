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

var RecipeList = React.createClass({
  mixins: [Reflux.connect(RecipeStore,'recipes')],
  handleClick: function(arg) {
    console.log("handling click", arg);
  },
  renderRecipes: function() {
    var listItems,
        recipes = this.state.recipes;

    if(recipes && recipes.length > 0) {
      listItems = _.map(recipes, function(recipe) {
        return(
          <ListGroupItem header={recipe.name} key={recipe.id} addonBefore={<Glyphicon glyph="search" />} onClick={this.handleClick}>
            {recipe.category.name}
            <span className="rating">Rating: {recipe.rating}</span>
          </ListGroupItem>
        );
      }.bind(this));
    }
    else {
      listItems = (
        <div>
          <h4>No recipes.</h4>
       </div>);
    }
    return listItems;
  },
  render: function() {
    console.log("State", this.state);
    return (
      <div className="pull-left col-md-6 col-lg-6 col-sm-6 recipe-list">
        <ListGroup>
          {this.renderRecipes()}
        </ListGroup>
      </div>);
  }
});

module.exports = RecipeList;

