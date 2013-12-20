var AnswerInput = React.createClass({
  getInitialState: function () {
    return {value: ""}; 
  },

  keyDown: function (e) {
    if (e.keyCode === 13) {
      this.submit(this.state.value);
      e.preventDefault(); 
      e.stopPropagation();
      return false;
    }
    return true;
  },

  submit: function (value) {
    this.props.socket.emit('submission', value);
    this.setState({value: ""});
  },

  handleChange: function (e) {
    this.setState({value: e.target.value}); 
  },

  render: function () {
    return (
    <input
      type="text"
      className="form-control"
      value={this.state.value}
      onChange={this.handleChange}
      onKeyDown={this.keyDown} />
    ); 
  },  
});

module.exports = AnswerInput;
