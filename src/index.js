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

const Map = ({color}) =>
        <div className={'block ' + color}></div>
  
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
    const [mapList, setMapList] = useState([])

    

    const generateCardList = () => {
        let tempWords = []
        tempWords = words
        let gameWords = []
            for (let i = 0; i < 25; i++) {
                let random = parseInt(Math.floor(Math.random() * tempWords.length))
                gameWords.push(tempWords[random])
                tempWords.splice(parseInt(random), 1)
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
         generateMapList(newCardList)
    }

    const generateMapList = (newCardList) => {
        let tempMapList = []
        for (const i in newCardList) {
            tempMapList.push(newCardList[i].secretColor)
        }
        setMapList(tempMapList);
    }
    
    return (
        <main>
            <h1>CODENAMES</h1>
            <button onClick={generateCardList}>New Game</button>
            <div className="container">
                <Board
                cardList={cardList} />
                <div className="map-section">
                    <div className="map">
                        <div className="row">
                             {mapList.map((color, index) => (
                                <Map 
                                key={index} 
                                color={color} 
                                />  
                                ))}
                        </div>
                    </div>
                </div>
                <PrintJSON
                cardList={cardList} />
            </div>
        </main>
      );
}
  
ReactDOM.render(
    <Game/>,
    document.getElementById('root'));
  