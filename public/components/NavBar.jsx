var renderState = function (component, isEditing) {
  var html;

  if (isEditing) {
    html = (
    <form className="navbar-form navbar-left">
      <div className="form-group">
        <input
          type="text"
          autoFocus
          className="form-control" 
          value={component.state.value} 
          onChange={component.handleChange}
          onKeyDown={component.keyDown} />
      </div> 
    </form> 
    ); 
  } else {
    html = (
    <div>
      <p className="navbar-text">
        Welcome to hell, 
        <span className="text-info">
          {component.props.user.name}
        </span>
      </p>
      <button
        className="btn btn-default navbar-btn"
        onClick={component.startEditing.bind(component)}>
        change name
      </button>
    </div>
    );
  }

  return html;
};

var NavBar = React.createClass({
  getInitialState: function () {
    return {
      isEditing: false,
      newName: ""
    }; 
  },

  startEditing: function () {
    this.setState({isEditing: true});
  },

  stopEditing: function () {
    this.setState({isEditing: false}); 
  },

  submit: function (value) {
    this.props.socket.emit("name-change", value);
  },

  keyDown: function (e) {
    switch (e.keyCode) {
      case 13:
        this.submit(this.state.value);
        this.stopEditing();
        e.preventDefault(); 
        e.stopPropagation();
        return false;
        break;
      case 27:
        this.stopEditing();
        e.preventDefault();
        e.stopPropagation();
        return false;
        break;
      default:
        return true;
    }
  },

  handleChange: function (e) {
    this.setState({value: e.target.value}); 
  },

  render: function () {

    return (
    <nav className="navbar navbar-inverse navbar-static-top">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">So Math, Wow.</a>
      </div>
      {renderState(this, this.state.isEditing)}
    </nav> 
    ); 
  },
});

module.exports = NavBar;
