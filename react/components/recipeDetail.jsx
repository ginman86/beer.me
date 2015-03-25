'use strict';

var React               = require('react');
var Reflux              = require('reflux');
var Router              = require('react-router');
var State               = require('react-router').State;
var Bs                  = require('react-bootstrap');
var _                   = require('lodash');

var CategoryStore       = require('../stores/categoryStore');
var RecipeActions       = require('../actions/recipeActions');
var RecipeDetailFooter  = require('./recipeDetailFooter.jsx');
var Input               = Bs.Input;
var Navigation          = Router.Navigation;

var RecipeDetail = React.createClass({
  mixins: [Reflux.connect(CategoryStore, 'categories'),State,Navigation],
  getInitialState: function() {
    var edit = this.getQuery().edit;

    return {
      edit: edit
    }
  },
  componentWillReceiveProps: function() {
    var edit = this.getQuery().edit;

    this.setState({edit: edit});

    return true;
  },
  save: function() {
    var recipe = this.props.recipe;

    _.extend(recipe, {
      id: this.props.id,
      name: this.refs.name.getValue(),
      description: this.refs.description.getValue(),
      rating: this.refs.rating.getValue(),
      categoryId: this.refs.category.getValue() * 1,
      category: _.find(this.state.categories, function(category) {
        return category.id == this.refs.category.getValue();
      }.bind(this)) });

    RecipeActions.saveRecipe(recipe, function() {
      this.transitionTo("/");
    }.bind(this));
  },
  renderCategories: function() {
    var categories = _.map(this.state.categories, function(category) {
      return(
        <option value={category.id}>{category.name}</option>
      );
    });

    return categories;
  },
  renderEdit: function() {
    return (
      <form>
        <Input ref="name" type="text" label='Name' defaultValue={this.props.recipe.name} />
        <Input ref="description" type="textarea" label='Description' defaultValue={this.props.recipe.description} />
        <Input ref="category" type="select" label='Category' defaultValue={this.props.recipe.category.id}>
          {this.renderCategories()}
        </Input>
        <Input ref="rating" type="text" label="Rating" defaultValue={this.props.recipe.rating} />
      </form>);
  },
  renderReadOnly: function() {
    return (
      <div>
        <h1>{this.props.recipe.name}</h1>
        <div>
          <span>Category: {this.props.recipe.category.name}</span>
        </div>
        <div>
          <span>Description: {this.props.recipe.description}</span>
        </div>
      </div>
    );
  },
  render: function() {
    var detail;

    if (this.state.edit) {
      detail = this.renderEdit();
    } else {
      detail = this.renderReadOnly();
    }

    return (
      <div>
        {detail}
        <RecipeDetailFooter id={this.props.id} edit={this.state.edit} save={this.save}/>
      </div>
    );
  }
});

module.exports = RecipeDetail;

