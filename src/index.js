import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import profile from './static/images/profile.png'

/*
Structure

Game
    - Board
        - Card
    - Map
    
	- AddPerson component
  - PeopleList component
    - Person #1 component
    - Person #2
    ...
    - Person #N
	- GenerateMatch button and function within App component
*/



var words = ["NAPOLEON", "BLIND", "CHECK", "TANK", "SPURS", "SHEET", "QUEEN", "MARK", "GENIE", "WASHINGTON", "PIN", "MUD", "PARROT", "SHAKESPEARE", "ENGINE", "MEMORY", "JOCKEY", "FLUTE", "CARROT", "POCKET", "BATTLE", "PAINT", "KNOT", "GANGSTER", "BUTTERFLY", "FOG", "KICK", "STRAW", "GEAR", "SWITCH", "BRIDE", "DRUM", "PALM", "MOSCOW", "FIRE", "BAND", "GREECE", "SQUARE", "NOVEL", "PIPE", "SMUGGLER", "ENGLAND", "ROSE", "FAN", "CHANGE", "OCTOPUS", "WEB", "WHIP", "STADIUM", "DRAGON", "MISSILE", "PASTE", "SPIKE", "SCIENTIST", "BLOCK", "FRANCE", "PIANO","BUCK", "SPOT", "TIME", "TORCH", "STATE", "AGENT", "PRINCESS", "ROULETTE"]

var board = {
    cards: []
}

class Card extends React.Component {
    render() {
        return (
        <div className="card brown">
            <div className="box">
                <div className="row">
                    <h6 className="small">{this.props.word}</h6>
                    <span className="profile"><img src={profile} alt="profile" /></span>
                </div>
                <h4 className="large">{this.props.word}</h4>
            </div>
        </div>
        )
    }
}

class Map extends React.Component {
    render() {
      return (
        <div className="map-section">
            <div className="map">
                <div className="row">
                    <div className="block blue"></div>
                    <div className="block red"></div>
                    <div className="block brown"></div>
                    <div className="block red"></div>
                    <div className="block blue"></div>
                </div>
                <div className="row">
                    <div className="block red"></div>
                    <div className="block brown"></div>
                    <div className="block brown"></div>
                    <div className="block red"></div>
                    <div className="block brown"></div>
                </div>
                <div className="row">
                    <div className="block black"></div>
                    <div className="block blue"></div>
                    <div className="block blue"></div>
                    <div className="block brown"></div>
                    <div className="block blue"></div>
                </div>
                <div className="row">
                    <div className="block red"></div>
                    <div className="block brown"></div>
                    <div className="block brown"></div>
                    <div className="block red"></div>
                    <div className="block red"></div>
                </div>
                <div className="row">
                    <div className="block blue"></div>
                    <div className="block blue"></div>
                    <div className="block brown"></div>
                    <div className="block red"></div>
                    <div className="block blue"></div>
                </div>
            </div>
        </div>
      );
    }
  }
  
  class Board extends React.Component {
    render() {
        console.log(this.props.board.cards)
        var board = this.props.board.cards.map((card, index) => {
            return (
              <Card 
                key={index} 
                word={card.word} 
                guessed={card.guessed}
                secretColor={card.secretColor}
                />
            );
          });
      return (
        <div className="row">
            {board}
        </div>
      );
    }
  }


class PrintJSON extends React.Component {
render() {
    return (
    <div className="json">
    {JSON.stringify(board)}</div>        
    )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.generateBoard = this.generateBoard.bind(this);
        this.state = {board: board};
    }
    generateBoard() {
        let gameWords = []
        for (let i = 0; i < 25; i++) {
            let random = parseInt(Math.floor(Math.random() * i))
            gameWords.push(words[random])
            words.splice(parseInt(random), 1)
        }
        for (const i in gameWords) {
            board.cards.push({
                word: gameWords[i],
                guessed: false,
                secretColor: "blue"
            })
        }
        this.setState({board: board});
    }
    render() {
      return (
        <main>
            <h1>CODENAMES</h1>
            <button onClick={this.generateBoard}>New Game</button>
            <div className="container">
                <Board
                board={this.props.board} />
                <Map />
                <PrintJSON />
            </div>
        </main>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game board={board}/>,
    document.getElementById('root'));
  