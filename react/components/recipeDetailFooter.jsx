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
    var cx = React.addons.classSet,
        saveClass = cx({
          'hide': !this.props.edit
        }),
        editClass = cx({
          'hide': this.props.edit
        });

    return (
      <ButtonToolbar>
        <Button bsStyle="link" onClick={this.back}>Back</Button>
        <ButtonLink className={editClass} bsStyle="link" to="detail"
        params={{recipeId: this.props.id}} query={{edit: true}}>Edit</ButtonLink>
        <Button className={saveClass} bsStyle="link" onClick={this.props.save}>Save</Button>
      </ButtonToolbar>
    );
  }
});

module.exports = RecipeDetailFooter;

