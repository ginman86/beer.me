'use strict';

var React           = require('react');
var Reflux          = require('reflux');
var Router          = require("react-router");
var Bs              = require('react-bootstrap');
var RecipeActions   = require('../actions/recipeActions');

var Navbar          = Bs.Navbar;
var NavItem         = Bs.NavItem;
var Nav             = Bs.Nav;
var Input           = Bs.Input;
var CollapsableNav  = Bs.CollapsableNav;
var Button          = Bs.Button;
var Glyphicon       = Bs.Glyphicon;
var Grid            = Bs.Grid;
var Col             = Bs.Col;
var Row             = Bs.Row;

var Navigation      = Router.Navigation;

var MainTopNav = React.createClass({
  mixins: [Navigation],
  addNew: function() {
    RecipeActions.addRecipe(function(id) {
      this.transitionTo('detail', {recipeId: id}, {edit: true});
    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <Grid fluid className="top-nav">
          <Row className="show-grid">
            <Col xs={2} sm={2} md={2} lg={2}><h2><img src="img/beer-small.png"/>beer.me</h2></Col>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Input type="text" placeholder="Search" addonBefore={<Glyphicon glyph="search" />} />
            </Col>
            <Col sm={4} md={4} lg={4}>
              <span className="user-name">Greg</span>
              <Glyphicon glyph="bell" className="bell"/>
              <Button bsSize="small" bsStyle="link" className="add-new" onClick={this.addNew}><Glyphicon glyph="plus" /> Add new</Button>
            </Col>
          </Row>
      </Grid>
      <hr/>
    </div>);
  }
});

module.exports = MainTopNav;