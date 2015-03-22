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
  setActiveCategory: function() {
    //todo
  },
  renderCategories: function() {
    var navItems,
        categories = this.state.categories;

    if (categories && categories.length > 0) {
      navItems = _.map(categories, function(category) {
        return (
          <NavItem eventKey={category.id} onClick={this.setActiveCategory}>{category.name}</NavItem>
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
        <Nav bsStyle="pills" stacked activeKey={1}>
          <NavItemLink eventKey={1} to="recipes">Recipes</NavItemLink>
          <NavItemLink eventKey={2} to="recipes" query={{favorite: true}}>Favorites</NavItemLink>
          <NavItemLink eventKey={3} to="recipes" query={{brewed: false}}>To-Brew</NavItemLink>
          <NavItem eventKey={4} disabled={true}>Categories</NavItem>
          <Nav className={categoryClasses} bsStyle="pills" stacked activeKey={2}>
            {categories}
          </Nav>
        </Nav>
      </div>);

  }
});

module.exports = MainSideNav;




