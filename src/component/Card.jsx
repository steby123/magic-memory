import React from "react";
import "./Card.css";

const Card = ({cards, handleChoice, flliped, disabled}) => {

    const handleClick = () => {
      if(!disabled){
      handleChoice(cards)
      }
    }
    
    return (
      <div className='card'>
        <div className={flliped ? "flipped" : "" }>
            <div>
                <img className='front' src={cards.src} alt='card-front' />
                <img className='back' src='/img/cover.png' alt='card back' onClick={handleClick}/>
              </div>
        </div>
      </div>     
    )
}

export default Card;