'use strict';

var React           = require('react/addons');
var Reflux          = require('reflux');
var categoryActions = require('../actions/categoryActions');
var categoryStore   = require('../stores/categoryStore');
var _               = require('lodash');
var Bs              = require('react-bootstrap');

var Nav             = Bs.Nav;
var NavItem         = Bs.NavItem;

var MainSideNav = React.createClass({
  mixins: [Reflux.connect(categoryStore, 'categories')],
  handleNavChanged: function(key) {
    console.log("nav item selected", key);
  },
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
        <Nav bsStyle="pills" stacked activeKey={1} onSelect={this.handleNavChanged}>
          <NavItem eventKey={1}>Recipes</NavItem>
          <NavItem eventKey={2}>Favorites</NavItem>
          <NavItem eventKey={3}>To-Brew</NavItem>
          <NavItem eventKey={3} disabled={true}>Categories</NavItem>
          <Nav className={categoryClasses} bsStyle="pills" stacked activeKey={2}>
            {categories}
          </Nav>
        </Nav>
      </div>);

  }
});

module.exports = MainSideNav;




