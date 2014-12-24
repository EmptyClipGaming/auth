var React = require('react/addons');

var classSet = React.addons.classSet;

var ValidationHelpers = {
  "presenceOf": function(value) {
    return value.length > 0 || "Required";
  },
  "alphanumeric": function(value) {
    return /^[a-z A-Z0-9]*$/.test(value) || "Invalid Characters";
  },
  "min-length": function(value, min) {
    return value.length >= min || "Minimum " + min + " Characters";
  },
  "max-length": function(value, max) {
    return value.length <= max || "Maximum " + max + " Characters";
  },
  "format": function(value, format) {
    var formats = {
      email: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
      phone: /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/
    };
    return formats[format].test(value) || "Invalid Format";
  },
  "custom": function(value, callback) {
    return callback(value);
  }
};

var ValidationMixin = {

  validate: function() {
    var errors = [];

    if (!this.props.validate || this.props.validate.length < 1) return this.setState({errors: null});
    
    this.props.validate.forEach(function(method) {
      var type = method[0];
      var args = method.slice(0);
      args[0] = this.state.value;

      var valid = ValidationHelpers[type].apply(null, args);

      if (typeof valid === "string") return errors.push(valid);
    }.bind(this));

    return this.setState({errors: errors.length > 0 ? errors : null});
  },

  componentWillMount: function() {
    this.setState({errors: []});
  },
};

var InputMixin = {
  componentWillMount: function() {
    this.setState({value: ""});
  },

  handleChange: function(event) {
    this.setState({value: event.target.value});
  },

  handleBlur: function(event) {
    this.validate();
  },
};

var TextInput = React.createClass({
  mixins: [ValidationMixin, InputMixin],

  render: function() {
    var formGroupClasses = classSet({
      "form-group": true,
      "has-feedback": true,
      "has-success": this.state.errors === null,
      "has-error": this.state.errors && this.state.errors.length > 0,
      "has-feedback": this.state.errors === null || this.state.errors.length !== 0
    });

    var inputClasses = classSet({
      "form-control": true,
      "input-lg": true
    });

    var inputValidClasses = classSet({
      "glyphicon": true,
      "glyphicon-ok": this.state.errors === null,
      "form-control-feedback": true
    });

    return (
      <div className={formGroupClasses}>
        <input
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          type="text"
          className={inputClasses}
          placeholder={this.props.placeholder}
          tabIndex={this.props.tabIndex}
          value={this.state.value} />
        { this.state.errors === null ? 
          <span className={inputValidClasses}></span>
          : 
          null 
        }
        
      </div>
    );
  }

});

var PasswordInput = React.createClass({
  mixins: [ValidationMixin, InputMixin],

  render: function() {
    var formGroupClasses = classSet({
      "form-group": true,
      "has-feedback": true,
      "has-success": this.state.errors === null,
      "has-error": this.state.errors && this.state.errors.length > 0,
      "has-feedback": this.state.errors === null || this.state.errors.length !== 0
    });

    var inputClasses = classSet({
      "form-control": true,
      "input-lg": true
    });

    var inputValidClasses = classSet({
      "glyphicon": true,
      "glyphicon-ok": this.state.errors === null,
      "form-control-feedback": true
    });

    return (
      <div className={formGroupClasses}>
        <input
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          type="password"
          className={inputClasses}
          placeholder={this.props.placeholder}
          tabIndex={this.props.tabIndex}
          value={this.state.value} />
        { this.state.errors === null ? 
          <span className={inputValidClasses}></span>
          : 
          null 
        }
        
      </div>
    );
  }

});

module.exports = {
  TextInput: TextInput,
  PasswordInput: PasswordInput
};
