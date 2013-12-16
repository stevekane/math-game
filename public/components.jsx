var Question = React.createClass({
  render: function () {
    return <div>{"Current Question: " + this.props.question}</div>;
  },
});

var Answer = React.createClass({
  render: function () {
    return <div>{"Current Answer: " + this.props.answer}</div>;
  },
});

var AnswerInput = React.createClass({
  getInitialState: function () {
    return {
      value: "",
    }; 
  },

  keyDown: function (e) {
    var el = this.getDOMNode()
      , value = el.value;

    if (e.keyCode === 13) {
      this.props.cloak.message('answer', value);
      this.setState({
        value: "",
      });
      e.preventDefault(); 
      e.stopPropagation();
      return false;
    }
    return true;
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

var HUD = React.createClass({
  render: function () {
    return (
      <div>
        <Question question={this.props.question} />
        <Answer answer={this.props.answer} />
        <AnswerInput cloak={this.props.cloak} />
      </div>
    ); 
  }
});

module.exports.Question = Question;
module.exports.Answer = Answer;
module.exports.AnswerInput = AnswerInput;
module.exports.HUD = HUD;
