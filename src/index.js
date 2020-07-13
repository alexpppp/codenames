import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import profile from './static/images/profile.png'

var words = ["NAPOLEON", "BLIND", "CHECK", "TANK", "SPURS", "SHEET", "QUEEN", "MARK", "GENIE", "WASHINGTON", "PIN", "MUD", "PARROT", "SHAKESPEARE", "ENGINE", "MEMORY", "JOCKEY", "FLUTE", "CARROT", "POCKET", "BATTLE", "PAINT", "KNOT", "GANGSTER", "BUTTERFLY", "FOG", "KICK", "STRAW", "GEAR", "SWITCH", "BRIDE", "DRUM", "PALM", "MOSCOW", "FIRE", "BAND", "GREECE", "SQUARE", "NOVEL", "PIPE", "SMUGGLER", "ENGLAND", "ROSE", "FAN", "CHANGE", "OCTOPUS", "WEB", "WHIP", "STADIUM", "DRAGON", "MISSILE", "PASTE", "SPIKE", "SCIENTIST", "BLOCK", "FRANCE", "PIANO","BUCK", "SPOT", "TIME", "TORCH", "STATE", "AGENT", "PRINCESS", "ROULETTE"]

const Card = ({word}) => 
        <div className="card brown">
            <div className="box">
                <div className="row">
                    <h6 className="small">{word}</h6>
                    <span className="profile"><img src={profile} alt="profile" /></span>
                </div>
                <h4 className="large">{word}</h4>
            </div>
        </div>

const Map = () =>
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
  
 const Board = ({cardList}) =>
            <div className="row">
                {cardList.map((card, index) => (
                <Card 
                key={index} 
                word={card.word} 
                />  
                ))}
            </div>
      
const PrintJSON = ({cardList}) =>
    <div className="json">
        {JSON.stringify(cardList)}
    </div>

function Game() {
    const [cardList, setCardList] = useState([])

    const generateBoard = () => {
        let gameWords = []
            for (let i = 0; i < 25; i++) {
                let random = parseInt(Math.floor(Math.random() * i))
                gameWords.push(words[random])
                words.splice(parseInt(random), 1)
            }
            var newCardList = []
            for (const i in gameWords) {
                newCardList.push({
                    word: gameWords[i],
                    guessed: false,
                    secretColor: "blue"
                })
            }
         setCardList(newCardList);
    }
    return (
        <main>
            <h1>CODENAMES</h1>
            <button onClick={generateBoard}>New Game</button>
            <div className="container">
                <Board
                cardList={cardList} />
                <Map />
                <PrintJSON
                cardList={cardList} />
            </div>
        </main>
      );
}
  
ReactDOM.render(
    <Game/>,
    document.getElementById('root'));
  