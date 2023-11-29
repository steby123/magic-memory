import { useEffect, useState } from 'react'
import './App.css'
import Card from './component/Card';

const cardImage = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false}
]

function App() {
  const [valid, setValid] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)

  //shuffle cards 
  const shuffleCard = () => {
    const expenses = [...cardImage, ...cardImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id:Math.random()}))
      
      setChoiceOne(null)
      setChoiceTwo(null)
      setValid(expenses)
      setTurns(0)
  }
  console.log(valid);

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if(choiceOne && choiceOne) {  
      setDisabled(true)

      if(choiceOne.src === choiceTwo.src){
        setValid((prevCards) => {
          return prevCards.map((card) => {
            if(card.src === choiceOne.src){
              return {...card, matched:true }
            }else{
              return card
            }
          })
        })
        resetTurn()
      }else{
        resetTurn(() => resetTurn(), 1000)
      }
    }

  },[choiceOne, choiceTwo])

  console.log(valid);

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
    setDisabled(false)
  };

  useEffect(() => {
    shuffleCard();
  },[])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCard}>New Game</button>
      
      <div className='card-grid'>
        {valid.map((cards) => (
            <Card  
              cards={cards} 
              key={cards.id} 
              handleChoice={handleChoice}
              flliped = {cards === choiceOne || cards === choiceTwo || cards.matched}
              disabled = {disabled}
            />
        ))}
      </div>
      <p>Turns {turns}</p>
    </div>
  );
}

export default App