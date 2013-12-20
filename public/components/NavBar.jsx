var NavBar = React.createClass({
  render: function () {
    return (
    <nav className="navbar navbar-inverse navbar-static-top">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">So Math, Wow.</a>
        <p className="navbar-text">
          Welcome to hell, {this.props.user.name}
        </p>
      </div>
    </nav> 
    ); 
  },
});

module.exports = NavBar;
