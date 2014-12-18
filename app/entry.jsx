var React = require("react");
var ReactApplication = require("./Main.jsx");
var Router = require("react-router");

Router.run(ReactApplication, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById("react"));
});
