'use strict';

var React               = require('react');
var RecipeDetailFooter  = require('./recipeDetailFooter.jsx');

var RecipeDetail = React.createClass({
  handleClick: function(arg) {

  },
  render: function() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <div>
          <span>Category: {this.props.category.name}</span>
        </div>
        <div>
          <span>Description: {this.props.description}</span>
        </div>
        <RecipeDetailFooter id={this.props.id} />
      </div>);
  }
});

module.exports = RecipeDetail;

