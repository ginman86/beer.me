'use strict';

var React               = require('react');
var Reflux              = require('reflux');
var State               = require('react-router').State;
var Bs                  = require('react-bootstrap');
var _                   = require('lodash');

var CategoryStore       = require('../stores/categoryStore');
var RecipeDetailFooter  = require('./recipeDetailFooter.jsx');
var Input               = Bs.Input;

var RecipeDetail = React.createClass({
  mixins: [Reflux.connect(CategoryStore, 'categories'),State],
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
        <Input type="text" label='Name' defaultValue={this.props.name} />
        <Input type="textarea" label='Description' defaultValue={this.props.description} />
        <Input type="select" label='Category' defaultValue={this.props.category.id}>
          {this.renderCategories()}
        </Input>
      </form>);
  },
  renderReadOnly: function() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <div>
          <span>Category: {this.props.category.name}</span>
        </div>
        <div>
          <span>Description: {this.props.description}</span>
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
        <RecipeDetailFooter id={this.props.id} edit={this.state.edit} />
      </div>
    );
  }
});

module.exports = RecipeDetail;

