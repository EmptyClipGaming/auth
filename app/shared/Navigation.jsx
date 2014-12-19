var React = require('react');

var Router = require("react-router");
var Link = Router.Link;

var Navigation = React.createClass({

  render: function() {
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Empty Clip Gaming</Link>
          </div>
          { !this.props.hideNavigation ?
            <ul className="nav navbar-nav">
              <li><a href="/servers">Servers</a></li>
              <li><a href="/dashboard">Community</a></li>
            </ul>
            :
            null
          }
        </div>
      </nav>
    );
  }

});

module.exports = Navigation;
