import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import profile from './static/images/profile.png'
import black from './static/images/black.jpeg'
import brown from './static/images/brown.jpeg'
import red from './static/images/red.jpeg'
import blue from './static/images/blue.jpeg'


var words = ["NAPOLEON", "BLIND", "CHECK", "TANK", "SPURS", "SHEET", "QUEEN", "MARK", "GENIE", "WASHINGTON", "PIN", "MUD", "PARROT", "SHAKESPEARE", "ENGINE", "MEMORY", "JOCKEY", "FLUTE", "CARROT", "POCKET", "BATTLE", "PAINT", "KNOT", "GANGSTER", "BUTTERFLY", "FOG", "KICK", "STRAW", "GEAR", "SWITCH", "BRIDE", "DRUM", "PALM", "MOSCOW", "FIRE", "BAND", "GREECE", "SQUARE", "NOVEL", "PIPE", "SMUGGLER", "ENGLAND", "ROSE", "FAN", "CHANGE", "OCTOPUS", "WEB", "WHIP", "STADIUM", "DRAGON", "MISSILE", "PASTE", "SPIKE", "SCIENTIST", "BLOCK", "FRANCE", "PIANO","BUCK", "SPOT", "TIME", "TORCH", "STATE", "AGENT", "PRINCESS", "ROULETTE"]

const Card = ({index, word, guessed, secretColor, revealSecretColor}) => {
    return (
        <div className={guessed ? 'card ' + secretColor: 'card'}
              onClick={() => revealSecretColor(index)} >
            <div className="box">
                <div className="row">
                    <h6 className="small">{word}</h6>
                    <span className="profile"><img src={ guessed ? `${secretColor === 'red' ? red : `${secretColor === 'blue' ? blue : `${secretColor === 'black' ? black : `${brown}`}`}`}` : profile} alt="profile" /></span>
                </div>
                <h4 className={guessed ? 'large ' + secretColor: 'large'}>{word}</h4>
            </div>
        </div>
    );
}

const ScoreBoard = ({redScore, blueScore, teamTurn, endTurn, showAllCards}) =>
        <div>
            <div className="scoreboard">
                <div className="red">
                    {redScore}
                </div>
                <div className="blue">
                    {blueScore}
                </div>
            </div>
            <div className={teamTurn + " turn"}>{teamTurn === "black" ? "GAME OVER!" : teamTurn + "'s turn" }</div>
            <button id="endTurnButton" onClick={teamTurn === "black" ? showAllCards : endTurn}>{teamTurn === "black" ? "Show all cards" : "End Turn"}</button>
        </div>
        
const Map = ({color}) =>
        <div className={'block ' + color}></div>
  
const Board = ({cardList, revealSecretColor}) =>
            <div className="row">
                {cardList.map((card, index) => (
                <Card 
                key={index}
                index={index} 
                word={card.word}
                guessed={card.guessed}
                secretColor={card.secretColor}
                revealSecretColor={revealSecretColor}
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
    const [teamList, setTeamList] = useState([
        { 
        team: "red",
        isTurn: false,
        count: 8
    },
    { 
        team: "blue",
        isTurn: true,
        count: 8,
    }
    ])
    const [gameSettings, setGameSettings] = useState({
        isOver: false,
        winner: null
    })

    useEffect(()=>{
        generateCardList()
    }, [])

    const generateCardList = () => {
        let tempWords = []
        tempWords = [...words]
        let gameWords = []
            // get 25 random gameWords from tempWords
            for (let i = 0; i < 25; i++) {
                let random = parseInt(Math.floor(Math.random() * tempWords.length))
                gameWords.push(tempWords[random])
                tempWords.splice(parseInt(random), 1)
            }

            // add the 25 words as objects in cardList
            var newCardList = []
            for (const i in gameWords) {
                newCardList.push({
                    word: gameWords[i],
                    guessed: false,
                    secretColor: null
                })
            }
            
            // set team color counts
            let newTeamList = []
            newTeamList = teamList
            setColorCounts(newTeamList)

            // add the random secretColor to newCardList
            for (const team in newTeamList) {
                while (newTeamList[team].count > 0) {
                    let random = parseInt(Math.floor(Math.random() * 25))
                    if (!newCardList[random].secretColor) {
                        newCardList[random].secretColor = newTeamList[team].team
                        newTeamList[team].count--
                    }
                }
            }
            // add the black card
            let blackCount = 1
            while (blackCount > 0) {
                let random = parseInt(Math.floor(Math.random() * 25))
                if (!newCardList[random].secretColor) {
                    newCardList[random].secretColor = "black"
                    blackCount--
                }
            }

            // add brown to remainder of card secretColors
            for (const i in newCardList) {
                if (!newCardList[i].secretColor) {
                    newCardList[i].secretColor = "brown"
                }
            }

        // reset counts for scoreboard
        setColorCounts(newTeamList)

        // reset 
        const tempGameSettings = {...gameSettings}
        tempGameSettings.isOver = false
        setGameSettings(tempGameSettings);
        
        setTeamList(newTeamList);  
        setCardList(newCardList);
        generateMapList(newCardList);
    }

    const setColorCounts = (newTeamList) => {
        for (const team in newTeamList) {
            if (newTeamList[team].isTurn) {
                newTeamList[team].count = 9
            } else if (!newTeamList[team].isTurn) {
                newTeamList[team].count = 8
            }
        }
        return newTeamList
    }

    const generateMapList = (newCardList) => {
        let tempMapList = []
        for (const i in newCardList) {
            tempMapList.push(newCardList[i].secretColor)
        }
        setMapList(tempMapList);
    }

    const revealSecretColor = index => {
        const newCardList = [...cardList];
        newCardList[index].guessed = true;
        setCardList(newCardList);
        updateScore()
        const teamTurn = teamList.find(i => i.isTurn).team
        if (newCardList[index].secretColor === "black") {
            gameOver(teamList.find(i => !i.isTurn).team)
        } else if (newCardList[index].secretColor != teamTurn) {
            endTurn()
        }
    }

    const updateScore = (index) => {
        if (gameSettings.isOver) {
            return
        }
        let tempTeamList = [...teamList]
        let redScore = 0
        let blueScore = 0
        for (const card in cardList) {
            if (!cardList[card].guessed && cardList[card].secretColor === "blue") {
                blueScore++
            }
            if (!cardList[card].guessed && cardList[card].secretColor === "red") {
                redScore++
            }
        }
        tempTeamList.find(i => i.team === "red").count = redScore
        tempTeamList.find(i => i.team === "blue").count = blueScore
        setTeamList(tempTeamList);
        checkforWin()
    }

    const endTurn = () => {
        let tempTeamList = [...teamList]
        for (const team in tempTeamList) {
            tempTeamList[team].isTurn = !tempTeamList[team].isTurn
        }
        setTeamList(tempTeamList);
    }

    const showAllCards = () => {
        const newCardList = [...cardList];
        for (const card in newCardList) {
            newCardList[card].guessed = true;
        }
        setCardList(newCardList);
    }

    const gameOver = (winner) => {
        const tempGameSettings = {...gameSettings}
        tempGameSettings.isOver = true
        tempGameSettings.winner = winner
        setGameSettings(tempGameSettings);
    }

    const checkforWin = () => {
        for (const team in teamList) {
            if (teamList[team].count === 0) {
                gameOver(teamList[team].team)
            }
        }
    }
    
    return (
        <main>
            <div className="container">
            <div className="row header">
            <div className="title">
                <h1>{gameSettings.winner ? gameSettings.winner + ' wins!' : "Codenames"}</h1>
                <button onClick={generateCardList}>New Game</button>
            </div>
                <ScoreBoard 
                redScore={teamList.find(i => i.team === "red").count}
                blueScore={teamList.find(i => i.team === "blue").count}
                teamTurn={gameSettings.isOver ? "black" : teamList.find(i => i.isTurn).team}
                endTurn={endTurn}
                showAllCards={showAllCards}
                />
            </div>
                <Board
                cardList={cardList}
                revealSecretColor={revealSecretColor} />
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
  