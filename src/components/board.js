import React from 'react';
import Card from './card.js';

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

export default Board;
