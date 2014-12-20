var React = require("react");
var ReactApplication = require("./Main.jsx");
var Router = require("react-router");
var flux = require("./shared/flux/FluxApplication");

Router.run(ReactApplication, Router.HistoryLocation, function(Handler) {
  React.render(<Handler flux={flux} />, document.getElementById("react"));
});
