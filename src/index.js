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



var words = ["NAPOLEON", "BLIND", "CHECK", "TANK", "SPURS", "SHEET", "QUEEN", "MARK", "GENIE", "WASHINGTON", "PIN", "MUD", "PARROT", "SHAKESPEARE", "ENGINE", "MEMORY", "JOCKEY", "FLUTE", "CARROT", "POCKET", "BATTLE", "PAINT", "KNOT", "GANGSTER", "BUTTERFLY", "FOG", "KICK"]

var board = {
    cards: [
        {
            rowCount: 0,
            colCount: 0,
            word: "BEIJING",
            guessed: false,
            tye: "civilian"
        },
        {
            rowCount: 0,
            colCount: 0,
            word: "BEIJING",
            guessed: false,
            tye: "civilian"
        },
        {
            rowCount: 0,
            colCount: 0,
            word: "BEIJING",
            guessed: false,
            tye: "civilian"
        },
        {
            rowCount: 0,
            colCount: 0,
            word: "BEIJING",
            guessed: false,
            tye: "civilian"
        },
        {
            rowCount: 0,
            colCount: 0,
            word: "WASHINGTON",
            guessed: false,
            tye: "civilian"
        },
    ]
}

class Card extends React.Component {
    render() {
        return (
            <div className="card brown">
            <div className="box">
                <div className="row">
                    <h6 className="small">BEIJING</h6>
                    <span className="profile"><img src={profile} alt="profile" /></span>
                </div>
                <h4 className="large">BEIJING</h4>
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
      const status = 'Next player: X';
  
      return (
        <div className="row">
            <Card />
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
    render() {
      return (
        <main>
            <h1>CODENAMES</h1>
            <button onClick="generateBoard()">New Game</button>
            <Board />
            <Map />
            <PrintJSON />
        </main>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game board={board}/>,
    document.getElementById('root')
  );
  