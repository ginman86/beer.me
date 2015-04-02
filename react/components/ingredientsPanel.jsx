var _             = require('lodash');
var React         = require('react');
var Reflux        = require('reflux');
var Bs            = require('react-bootstrap');

var Panel         = Bs.Panel;
var ListGroup     = Bs.ListGroup;
var ListGroupItem = Bs.ListGroupItem;
var Glyphicon     = Bs.Glyphicon;
var DropdownButton = Bs.DropdownButton;
var MenuItem       = Bs.MenuItem;
var Input          = Bs.Input;

var IngredientStore = require('../stores/ingredientStore');

var IngredientsPanel = React.createClass({
  mixins: [Reflux.connect(IngredientStore, 'allIngredients')],
  getInitialState: function() {
    return {
      search: ""
    }
  },
  filterExisting: function() {
    return _.filter(this.state.allIngredients, function(ingredient) {
      console.log(!_.any(this.props.currentIngredients, ingredient.id))
      return !_.any(this.props.currentIngredients, ingredient.id);
    });
  },
  search: function(e) {
    var searchTerm = e.currentTarget.value;

    console.log("Searching", searchTerm);

    if (typeof searchTerm === "string") {
      this.setState({
        search: searchTerm.toLowerCase()
      });
    }
  },
  renderAvailableIngredients: function() {
    var content,
        ingredients;

    ingredients = _.filter(this.state.allIngredients, function(ingredient) {
      console.log(!_.any(this.props.currentIngredients, ingredient.id))
      if (!_.any(this.props.currentIngredients, ingredient.id)) {
        var name = ingredient.name.split(' '),
            render = false;

        if (name && name.length > 0) {
          _.each(name, function(word) {
            if (_.startsWith(word.toLowerCase(), this.state.search)) {
              render = true;
              return false;
            }
          }.bind(this));
        }

        return render;
      } else {
        return false;
      }
    }.bind(this));

    console.log("WUT")
    //filter already added ingredients
    content = _.map(ingredients, function(ingredient) {
      return (<MenuItem id={ingredient.id} onClick={this.props.addIngredient}><Glyphicon glyph="plus"/> {ingredient.name}</MenuItem>);
    }.bind(this));

    return content;
  },
  renderDetails: function() {
    var content;

    content = _.map(this.state.ingredients, function(ingredient) {
      return (<ListGroupItem id={ingredient.id}><Glyphicon glyph="plus" /> {ingredient.name}</ListGroupItem>);
    });
    return content;
  },
  render: function() {
    var addIngredientClass = false,
        cx = React.addons.classSet;

    return (
      <Panel {...this.props} header="Ingredients">
        <DropdownButton bsStyle='default' title="+ Add new">
          <Input type="text" placeholder="Search" addonBefore={<Glyphicon glyph="search" />} onChange={this.search} />
          {this.renderAvailableIngredients()}
        </DropdownButton>
        <ListGroup fill>
        </ListGroup>
      </Panel>);
  }
});

module.exports = IngredientsPanel;