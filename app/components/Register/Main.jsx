var React = require('react/addons');
var Fluxxor = require("fluxxor");

var classSet = React.addons.classSet;

var FormItems = require("./FormItems.jsx");

var TextInput = FormItems.TextInput;

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Main = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("SessionStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    var store = flux.store("SessionStore");

    return {
      first_name: {
        value: "",
        valid: null
      },
      last_name: {
        value: "",
        valid: null
      },
      display_name: {
        value: "",
        valid: null
      },
      email: {
        value: "",
        valid: null
      },
      password: {
        value: "",
        valid: null
      },
      password_confirmation: {
        value: "",
        valid: null
      }
    };
  },

  _validations: {
    first_name: function() {
      return "You Done Goofed";
    },
    last_name: function() {
      return true;
    },
    display_name: function() {
      return true;
    },
    email: function() {
      return true;
    },
    password: function() {
      return true;
    },
    password_confirmation: function() {
      return true;
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

  handleBlur: function(event) {
    var fieldState = {};
    fieldState[event.target.id] = {
      valid: {$set: this._validations[event.target.id]()}
    };
    var newState = React.addons.update(this.state, fieldState);
    this.setState(newState);
  },

  handleChange: function(event) {
    var fieldState = {};
    fieldState[event.target.id] = {
      value: {$set: event.target.value}
    };
    var newState = React.addons.update(this.state, fieldState);
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
                  <TextInput ref="first_name" placeholder="First Name" tabIndex="1" />
                </div>
                <div className="col-md-6">
                  <div className={classSet({"form-group": true, "has-feedback": true, "has-success": this.state.last_name.valid, "has-error": typeof this.state.last_name.valid === "string"})}>
                    <input onBlur={this.handleBlur} onChange={this.handleChange} type="text" ref="last_name" id="last_name" className="form-control input-lg" placeholder="Last Name" tabindex="2" value={this.state.last_name.value} />
                  </div>
                </div>
              </div>
              <div className={classSet({"form-group": true, "has-feedback": true, "has-success": this.state.display_name.valid, "has-error": typeof this.state.display_name.valid === "string"})}>
                <input onBlur={this.handleBlur} onChange={this.handleChange} type="text" ref="display_name" id="display_name" className="form-control input-lg" placeholder="Display Name" tabindex="3" value={this.state.display_name.value} />
              </div>
              <div className={classSet({"form-group": true, "has-feedback": true, "has-success": this.state.email.valid, "has-error": typeof this.state.email.valid === "string"})}>
                <input onBlur={this.handleBlur} onChange={this.handleChange} type="email" ref="email" id="email" className="form-control input-lg" placeholder="Email Address" tabindex="4" value={this.state.email.value} />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className={classSet({"form-group": true, "has-feedback": true, "has-success": this.state.password.valid, "has-error": typeof this.state.password.valid === "string"})}>
                    <input onBlur={this.handleBlur} onChange={this.handleChange} type="password" ref="password" id="password" className="form-control input-lg" placeholder="Password" tabindex="5" value={this.state.password.value} />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={classSet({"form-group": true, "has-feedback": true, "has-success": this.state.password_confirmation.valid, "has-error": typeof this.state.password_confirmation.valid === "string"})}>
                    <input onBlur={this.handleBlur} onChange={this.handleChange} type="password" ref="password_confirmation" id="password_confirmation" className="form-control input-lg" placeholder="Confirm Password" tabindex="6" value={this.state.password_confirmation.value} />
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

