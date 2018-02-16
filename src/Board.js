import React, { Component } from 'react';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { picked: new Set() };
  }

  onClick(cardId) {
    let picked = this.state.picked;
    picked.has(cardId) ? picked.delete(cardId) : picked.add(cardId);
    this.setState({ picked });

    if (this.state.picked.size === 3) {
      this.props.moves.check(
        Array.from(this.state.picked)
      );
      this.setState({ picked: new Set() });
      this.props.events.endTurn();
    }
  }

  render() {
    const { deck, board } = this.props.G;
    const { picked } = this.state;

    let tbody = [];
    for (let i = 0; i < 3; i++) {
      let cells = [];
      for (let j = 0; j < 4; j++) {
        const pos = 4 * i + j;
        const cardId = deck[board[pos]];
        const imgUrl = `icons/${cardId}.svg`;
        const cellStyle = {
          backgroundColor: picked.has(cardId) ? "grey" : "white"
        }

        cells.push(
          <td key={pos} style={cellStyle} onClick={() => this.onClick(cardId)}>
            <img src={imgUrl} alt="Card" />
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <div>
        <table id="board">
          <tbody>{tbody}</tbody>
        </table>
      </div>
    );
  }
}