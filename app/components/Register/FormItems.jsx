var React = require('react/addons');

var classSet = React.addons.classSet;

var ValidationMixin = {

  validate: function() {

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
    return;
  },
};

var TextInput = React.createClass({
  mixins: [ValidationMixin, InputMixin],

  render: function() {
    var formGroupClasses = classSet({
      "form-group": true,
      "has-feedback": true,
      "has-success": this.validate(),
      "has-error": !this.validate()
    });

    var inputClasses = classSet({
      "form-control": true,
      "input-lg": true
    });

    return (
      <div className={formGroupClasses}>
        <input
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          type="text"
          className={inputClasses}
          placeholder={this.props.placeholder}
          tabindex={this.props.tabIndex}
          value={this.state.value} />
      </div>
    );
  }

});

module.exports = {
  TextInput: TextInput
};
