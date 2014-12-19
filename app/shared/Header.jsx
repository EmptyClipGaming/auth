var React = require('react');

var Router = require("react-router");
var Link = Router.Link;

var Navigation = require("./Navigation.jsx");

var Header = React.createClass({

  getDefaultProps: function() {
    return {
      hideNavigation: false,
      hideLogin: false
    };
  },

  render: function() {
    return (
      <header>
        <Navigation {...this.props} />
      </header>
    );
  }

});

module.exports = Header;
