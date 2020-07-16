import React from 'react';
import profile from './../static/images/profile.png'
import black from './../static/images/black.jpeg'
import brown from './../static/images/brown.jpeg'
import red from './../static/images/red.jpeg'
import blue from './../static/images/blue.jpeg'

const Card = ({index, word, guessed, secretColor, revealSecretColor}) => {
    let images = {
        profile: profile,
        red: red,
        blue: blue,
        brown: brown,
        black: black,
    }
    return (
        <div className={guessed ? 'card ' + secretColor: 'card'}
              onClick={() => revealSecretColor(index)} >
            <div className="box">
                <div className="row">
                    <h6 className="small">{word}</h6>
                    <span className="profile"><img src={ guessed ? images[secretColor] : images.profile} alt="profile" /></span>
                </div>
                <h4 className={guessed ? 'large ' + secretColor: 'large'}>{word}</h4>
            </div>
        </div>
    );
}

export default Card;