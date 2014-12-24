var React = require('react/addons');
var Fluxxor = require("fluxxor");

var classSet = React.addons.classSet;

var FormItems = require("./FormItems.jsx");

var TextInput = FormItems.TextInput;
var PasswordInput = FormItems.PasswordInput;

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Main = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("SessionStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    var store = flux.store("SessionStore");

    return {
      error: store.error || (this.state && this.state.error) || false,
      error_message: ""
    };
  },

  validatePasswordConfirmation: function() {
    return this.refs.password.state.value === this.refs.password_confirmation.state.value || "Passwords don't match";
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var error = false;
    var user = {};
    for (var key in this.refs) {
      if (!this.refs.hasOwnProperty(key)) continue;
      user[key] = this.refs[key].state.value;
      this.refs[key].validate();
      if (this.refs[key].state.errors !== null) error = true;
    }

    if (!error) {
      this.getFlux().actions.register(user);
    }

    return this.setState({error: error, error_message: "The form has errors"});
  },

  render: function() {
    return (
      <div className="container" style={{"marginTop": "30px"}}>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <form onSubmit={this.handleSubmit} role="form">
              <h2>Please Sign Up <small>It's free and always will be.</small></h2>
              <hr className="colorgraph" />
              { this.state.error ?
                <div className="alert alert-danger">{this.state.error_message}</div>
                :
                null
              }
              <div className="row">
                <div className="col-md-6">
                  <TextInput 
                    ref="first_name" 
                    validate={[
                      ["presenceOf"],
                      ["alphanumeric"],
                      ["min-length", 3],
                      ["max-length", 15]
                    ]} 
                    placeholder="First Name" 
                    tabIndex="1" />
                </div>
                <div className="col-md-6">
                  <TextInput
                    ref="last_name"
                    validate={[
                      ["presenceOf"],
                      ["alphanumeric"],
                      ["min-length", 3],
                      ["max-length", 15]

                    ]}
                    placeholder="Last Name"
                    tabIndex="2" />
                </div>
              </div>
              <TextInput
                    ref="display_name"
                    validate={[
                      ["presenceOf"],
                      ["alphanumeric"],
                      ["min-length", 3],
                      ["max-length", 15]

                    ]}
                    placeholder="Display Name"
                    tabIndex="3" />
              <TextInput
                    ref="email"
                    validate={[
                      ["presenceOf"],
                      ["min-length", 3],
                      ["max-length", 40],
                      ["format", "email"]
                    ]}
                    placeholder="Email Address"
                    tabIndex="4" />
              <div className="row">
                <div className="col-md-6">
                  <PasswordInput
                    ref="password"
                    validate={[
                      ["presenceOf"],
                      ["min-length", 5],
                      ["max-length", 15]
                    ]}
                    placeholder="Password"
                    tabIndex="5" />
                </div>
                <div className="col-md-6">
                  <PasswordInput
                    ref="password_confirmation"
                    validate={[
                      ["presenceOf"],
                      ["min-length", 5],
                      ["max-length", 15],
                      ["custom", this.validatePasswordConfirmation]
                    ]}
                    placeholder="Confirmation"
                    tabIndex="6" />
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

