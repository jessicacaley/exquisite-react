import React, { Component } from 'react';
import './Game.css';
import PlayerSubmissionForm from './PlayerSubmissionForm';
import FinalPoem from './FinalPoem';
import RecentSubmission from './RecentSubmission';

class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      poem: [""],
      gameOver: false,
    }
  }

  addLine = (line) => {
    const newPoem = this.state.poem;

    newPoem.push(line);

    this.setState({
      poem: newPoem,
    })
  }

  onGameOver = () => {
    this.setState ({
      gameOver: true,
    });
  }

  render() {
    const exampleFormat = FIELDS.map((field) => {
      if (field.key) {
        return field.placeholder;
      } else {
        return field;
      }
    }).join(" ");

    return (
      <div className="Game">
        <h2>Game</h2>

        <p>Each player should take turns filling out and submitting the form below. Each turn should be done individually and <em>in secret!</em> Take inspiration from the revealed recent submission. When all players are finished, click the final button on the bottom to reveal the entire poem.</p>

        <p>Please follow the following format for your poetry submission:</p>

        <p className="Game__format-example">
          { exampleFormat }
        </p>

        <RecentSubmission
          line = {this.state.poem[this.state.poem.length - 1]}
          gameOver = {this.state.gameOver} />

        <PlayerSubmissionForm
          fields = {FIELDS}
          addLineCallback = {this.addLine}
          currentPlayer = {this.state.poem.length} // not plus one because starting out with empty string in poem array (for sake of proptypes in recent submission)
          gameOver = {this.state.gameOver} />

        <FinalPoem 
          poem = {this.state.poem}
          gameOverCallback = {this.onGameOver} />

      </div>
    );
  }
}

const FIELDS = [
  "The",
  {
    key: 'adj1',
    placeholder: 'adjective',
  },
  {
    key: 'noun1',
    placeholder: 'noun',
  },
  {
    key: 'adv',
    placeholder: 'adverb',
  },
  {
    key: 'verb',
    placeholder: 'verb',
  },
  "the",
  {
    key: 'adj2',
    placeholder: 'adjective',
  },
  {
    key: 'noun2',
    placeholder: 'noun',
  },
  ".",
];

export default Game;
