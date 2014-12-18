var React = require('react');

var Router = require("react-router");
var Link = Router.Link;

var Header = React.createClass({

  getDefaultProps: function() {
    return {
      hideNavigation: false
    };
  },

  render: function() {
    return (
      <header>
        <li><Link to="dashboard">Dashboard</Link></li>
      </header>
    );
  }

});

module.exports = Header;
