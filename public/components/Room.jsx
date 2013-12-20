var AnswerInput = require('./AnswerInput.jsx')
  , PlayerList = require('./PlayerList.jsx');

var Room = React.createClass({
  render: function () {
    return (
    <div className="col-md-9">
      <section className="col-md-9">
        <h1>Question: {this.props.question}</h1>
        <h2>Answer: {this.props.answer}</h2>
        <AnswerInput cloak={this.props.cloak} />
      </section>

      <aside className="col-md-3">
        <PlayerList players={this.props.players} />
      </aside>
    </div>
    ); 
  }
});

module.exports = Room;
