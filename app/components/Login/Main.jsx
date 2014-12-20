var React = require('react');
var Fluxxor = require("fluxxor");

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Main = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("SessionStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    var store = flux.store("SessionStore");

    return {
      error: store.error,
      loading: store.loading,
      session: store.session
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var username = this.refs.username.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();

    if (!username || !password) {
      return this.setState({error: true});
    }

    this.getFlux().actions.login(username, password);

    this.refs.username.getDOMNode.value = '';
    this.refs.password.getDOMNode.value = '';
    return this.setState({error: false});
  },

  render: function() {
    return (
      <div className="container" style={{"marginTop": "30px"}}>
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title"><strong>Sign In</strong></h3>
            </div>
            <div className="panel-body">
              { this.state.error ? 
                <div className="alert alert-danger">
                  { typeof this.state.error === "string" ? this.state.error : "Opps, someone busted the login server!" }
                </div> 
                : 
                null 
              }
              <form onSubmit={this.handleSubmit} role="form">
                <div className="form-group">
                  <label>Username or Email</label>
                  <input ref="username" type="email" className="form-control" placeholder="Enter Email" />
                </div>
                <div className="form-group">
                  <label>Password <a href="/sessions/forgot_password">(forgot password)</a></label>
                  <input ref="password" type="password" className="form-control" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-sm btn-default">Sign In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Main;

