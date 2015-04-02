var React         = require('react');
var Bs            = require('react-bootstrap');

var DirectionsDetail  = require('./directionsDetail.jsx');

var Panel    = Bs.Panel;

var DirectionsPanel = React.createClass({
  renderDetails: function() {
    return "derp";
  },
  render: function() {
    return (
      <Panel {...this.props} header="Directions">
        {this.renderDetails()}
      </Panel>);
  }
});

module.exports = DirectionsPanel;