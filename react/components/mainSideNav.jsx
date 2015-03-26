'use strict';

var React           = require('react/addons');
var Reflux          = require('reflux');
var categoryActions = require('../actions/categoryActions');
var categoryStore   = require('../stores/categoryStore');
var _               = require('lodash');
var Bs              = require('react-bootstrap');
var RouterBs        = require('react-router-bootstrap');

var Nav             = Bs.Nav;
var NavItem         = Bs.NavItem;
var NavItemLink     = RouterBs.NavItemLink;

var MainSideNav = React.createClass({
  mixins: [Reflux.connect(categoryStore, 'categories')],
  setActiveCategory: function(a, b, c) {
    //todo
    console.log("Set Active Category", a, b,c);
  },
  renderCategories: function() {
    var navItems,
        categories = this.state.categories;

    if (categories && categories.length > 0) {
      navItems = _.map(categories, function(category) {
        return (
          <NavItemLink eventKey={category.id} to="recipes" query={{categoryId: category.id}}>{category.name}</NavItemLink>
        );
      }.bind(this));
    }

    return navItems;
  },
  render: function() {
    var categories = this.renderCategories(),
        cx = React.addons.classSet,
        categoryClasses = cx({
          none: !categories || categories.length == 0,
        });

    return (
      <div className="side-nav col-md-2 col-lg-2 col-sm-2">
        <Nav bsStyle="pills" stacked>
          <NavItem eventKey={1} disabled={true}>Recipes</NavItem>
          <NavItemLink eventKey={2} to="recipes" query={{favorite: true}}>Favorites</NavItemLink>
          <NavItemLink eventKey={3} to="recipes" query={{brewed: false}}>To-Brew</NavItemLink>
          <NavItem eventKey={4} disabled={true}>Categories</NavItem>
          <Nav className={categoryClasses} bsStyle="pills" stacked>
            {categories}
          </Nav>
        </Nav>
      </div>);

  }
});

module.exports = MainSideNav;




