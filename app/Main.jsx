var React = require("react");
var Router = require("react-router");

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Header = require("./shared/Header.jsx");
var Login = require("./components/Login/Main.jsx");

var Application = React.createClass({
  render: function() {
    return (
      <div className="application">
        <Header />
        <main>
          <RouteHandler />
        </main>
      </div>
    );
  }
});

var Dashboard = React.createClass({
  render: function() {
    return <h1>Dashboard</h1>;
  }
});

var routes = (
  <Route handler={Application}>
    <DefaultRoute handler={Login} />
    <Route name="dashboard" handler={Dashboard} />
  </Route>
);

module.exports = routes;
