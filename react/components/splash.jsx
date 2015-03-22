'use strict';

var React       = require('react');
var Reflux      = require('reflux');
var Bs          = require('react-bootstrap');
var Button      = Bs.Button;
var Jumbotron   = Bs.Jumbotron;

var Splash = React.createClass({
  render: function() {
    return (
      <Jumbotron>
        <h1>beer.me</h1>
        <p>Create and share your favorite homebrew recipes!</p>
        <p><Button bsStyle="primary">Get Started</Button></p>
      </Jumbotron>);
  }
});

module.exports = Splash;
