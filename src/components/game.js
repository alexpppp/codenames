import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import words from '../data/words.js';
import ScoreBoard from './scoreBoard.js';
import Map from './map.js';
import Board from './board.js';

// import { store } from "../index";
import { setGameSettings, setTeamList, setCardList, setMapList } from "../actions";

function Game() {
    const store = useSelector(state => state);
    const dispatch = useDispatch();

    const generateCardList = () => {
        const teamList = store.teamList
        const gameSettings = store.gameSettings
        
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
        
        // change starting team 
        let newTeamList = []
        newTeamList = [...teamList]
        const tempGameSettings = {...gameSettings}
        if (tempGameSettings.startingTeam === newTeamList.find(i => i.isTurn).team) {
            endTurn()
            tempGameSettings.startingTeam = newTeamList.find(i => i.isTurn).team
        }

        // set team color counts
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

        // reset game isOver
        tempGameSettings.isOver = false
        
        // rehide Map on new game start
        tempGameSettings.showMap = false

        // reset game winner to null
        tempGameSettings.winner = null
        
        // dispatch actions to update store
        dispatch(setGameSettings(tempGameSettings));
        dispatch(setTeamList(newTeamList));
        dispatch(setCardList(newCardList));
        
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
        dispatch(setMapList(tempMapList));
    }

    const revealSecretColor = (index) => {
        const teamList = store.teamList
        const cardList = store.cardList
        const newCardList = [...cardList];
        newCardList[index].guessed = true;
        setCardList(newCardList);
        updateScore()
        const teamTurn = teamList.find(i => i.isTurn).team
        if (newCardList[index].secretColor === "black") {
            gameOver(teamList.find(i => !i.isTurn).team)
        } else if (newCardList[index].secretColor !== teamTurn) {
            endTurn()
        }
    }

    const updateScore = (index) => {
        const gameSettings = store.gameSettings
        const cardList = store.cardList
        if (gameSettings.isOver) {
            return
        }
        const teamList = store.teamList
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
        
        dispatch(setTeamList(tempTeamList));
        checkforWin()
    }

    const endTurn = () => {
        const teamList = store.teamList
        let tempTeamList = [...teamList]
        for (const team in tempTeamList) {
            tempTeamList[team].isTurn = !tempTeamList[team].isTurn
        }
        dispatch(setTeamList(tempTeamList));
    }

    const showAllCards = () => {
        const cardList = store.cardList
        const newCardList = [...cardList];
        for (const card in newCardList) {
            newCardList[card].guessed = true;
        }
        dispatch(setCardList(newCardList));
    }

    const gameOver = (winner) => {
        const gameSettings = store.gameSettings
        const tempGameSettings = {...gameSettings}
        tempGameSettings.isOver = true
        tempGameSettings.winner = winner
        
        dispatch(setGameSettings(tempGameSettings));
    }

    const checkforWin = () => {
        const teamList = store.teamList
        for (const team in teamList) {
            if (teamList[team].count === 0) {
                gameOver(teamList[team].team)
            }
        }
    }

    const toggleMap = () => {
        const gameSettings = store.gameSettings
        const tempGameSettings = {...gameSettings}
        tempGameSettings.showMap = !tempGameSettings.showMap
        
        dispatch(setGameSettings(tempGameSettings));
    }
    useEffect(()=>{
        generateCardList()
        // eslint-disable-next-line
    }, [])
    
    return (
        <main>
            <div className="container">
            <div className="row header">
            <div className="title">
                <h1>{store.gameSettings.winner ? store.gameSettings.winner + ' wins!' : "Codenames"}</h1>
                <button onClick={generateCardList}>New Game</button>
            </div>
                <ScoreBoard 
                redScore={store.teamList.find(i => i.team === "red").count}
                blueScore={store.teamList.find(i => i.team === "blue").count}
                teamTurn={store.gameSettings.isOver ? "black" : store.teamList.find(i => i.isTurn).team}
                endTurn={endTurn}
                showAllCards={showAllCards}
                />
            </div>
                <Board
                cardList={store.cardList}
                revealSecretColor={revealSecretColor} />
                <div className="map-section">
                <button id="mapToggle" onClick={toggleMap}>{store.gameSettings.showMap ? "Hide Map" : "Show Codemaster Map"}</button>
                    <div className={store.gameSettings.showMap ? "map" : "map hidden"}>
                        <div className="row">
                                {store.mapList.map((color, index) => (
                                    <Map 
                                    key={index} 
                                    color={color} 
                                    />  
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
      );
}

export default Game;