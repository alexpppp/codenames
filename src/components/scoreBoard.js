import React from 'react';

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

export default ScoreBoard