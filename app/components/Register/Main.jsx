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
      first_name: "",
      last_name: "",
      display_name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },

  _validations: {
    first_name: function() {
      return true
    },
    last_name: function() {
      return true
    },
    display_name: function() {
      return true
    },
    email: function() {
      return true
    },
    password: function() {
      return true
    },
    password_confirmation: function() {
      return true
    }
  },

  handleSubmit: function(e) {
    e.preventDefault();
    console.log(this.refs);
    for (var key in this.refs) {
      if (!this.refs.hasOwnProperty(key)) continue;
      console.log(this.refs[key]);
    }
    return this.setState({error: false});
  },

  handleChange: function(event) {
    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  },

  render: function() {
    return (
      <div className="container" style={{"marginTop": "30px"}}>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <form onSubmit={this.handleSubmit} role="form">
              <h2>Please Sign Up <small>It's free and always will be.</small></h2>
              <hr className="colorgraph" />
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input onChange={this.handleChange} type="text" ref="first_name" id="first_name" className="form-control input-lg" placeholder="First Name" tabindex="1" value={this.state.first_name} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input onChange={this.handleChange} type="text" ref="last_name" id="last_name" className="form-control input-lg" placeholder="Last Name" tabindex="2" value={this.state.last_name} />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <input onChange={this.handleChange} type="text" ref="display_name" id="display_name" className="form-control input-lg" placeholder="Display Name" tabindex="3" value={this.state.display_name} />
              </div>
              <div className="form-group">
                <input onChange={this.handleChange} type="email" ref="email" id="email" className="form-control input-lg" placeholder="Email Address" tabindex="4" value={this.state.email} />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input onChange={this.handleChange} type="password" ref="password" id="password" className="form-control input-lg" placeholder="Password" tabindex="5" value={this.state.password} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input onChange={this.handleChange} type="password" ref="password_confirmation" id="password_confirmation" className="form-control input-lg" placeholder="Confirm Password" tabindex="6" value={this.state.password_confirmation} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  By clicking <strong className="label label-primary">Register</strong>, you agree to the Terms and Conditions of this site, including our Cookie Use.
                </div>
              </div>
              
              <hr className="colorgraph" />
              <div className="row">
                <div className="col-md-6"><input type="submit" value="Register" className="btn btn-primary btn-block btn-lg" tabindex="7" /></div>
                <div className="col-md-6"><a href="#" className="btn btn-success btn-block btn-lg">Sign In</a></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Main;

