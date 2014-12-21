var React = require("react");
var Router = require("react-router");

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React);

var Header = require("./shared/Header.jsx");
var Login = require("./components/Login/Main.jsx");
var Register = require("./components/Register/Main.jsx");

var Application = React.createClass({
  mixins: [FluxMixin],

  render: function() {
    return (
      <div className="application">
        <Header hideNavigation={true} hideLogin={true} />
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

var NotFound = React.createClass({
  render: function() {
    return <h1>Opps... I lost it.</h1>;
  }
});

var routes = (
  <Route handler={Application}>
    <DefaultRoute handler={Login} />
    <Route name="login" path="/" handler={Login} />
    <Route name="dashboard" handler={Dashboard} />
    <Route name="register" path="/register" handler={Register} />
    <NotFoundRoute handler={NotFound} />
  </Route>
);

module.exports = routes;
