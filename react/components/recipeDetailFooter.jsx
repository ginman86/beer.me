'use strict';

var React         = require('react');
var Bs            = require('react-bootstrap');
var RouterBs      = require('react-router-bootstrap');

var ButtonToolbar = Bs.ButtonToolbar;
var Button        = Bs.Button;
var ButtonLink    = RouterBs.ButtonLink;

var RecipeDetailFooter = React.createClass({
  back: function() {
    window.history.back();
    return;
  },
  render: function() {
    return (
      <ButtonToolbar>
        <Button bsStyle="link" onClick={this.back}>Back</Button>
        <ButtonLink bsStyle="link" to="detail"
        params={{recipeId: this.props.id}} query={{edit: true}}>Edit</ButtonLink>
      </ButtonToolbar>
      );
  }
});

module.exports = RecipeDetailFooter;

