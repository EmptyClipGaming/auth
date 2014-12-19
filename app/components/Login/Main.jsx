var React = require('react');

var Main = React.createClass({

  render: function() {
    return (
      <div className="container" style={{"marginTop": "30px"}}>
        <div className="col-md-4 col-md-offset-4">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title"><strong>Sign In</strong></h3>
            </div>
            <div className="panel-body">
              <form role="form">
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Username or Email</label>
                  <input type="email" className="form-control" placeholder="Enter Email" />
                </div>
                <div className="form-group">
                  <label>Password <a href="/sessions/forgot_password">(forgot password)</a></label>
                  <input type="password" className="form-control" placeholder="Password" />
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
