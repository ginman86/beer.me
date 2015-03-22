'use strict';

var React   = require('react');
var Bs      = require('react-bootstrap');
var Router  = require('react-router');

var ListGroupItem = Bs.ListGroupItem;
var Navigation    = Router.Navigation;

var RecipeListItem = React.createClass({
  mixins: [Navigation],
  handleClick: function(arg) {
    this.transitionTo('detail', {recipeId: this.props.id});
  },
  render: function() {
    return (
      <ListGroupItem {...this.props} onClick={this.handleClick}>
        {this.props.category.name}
        <span className="rating">Rating: {this.props.rating}</span>
      </ListGroupItem>
    );
  }
});

module.exports = RecipeListItem;



