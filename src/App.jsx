import { useState, useEffect } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { getRandomWord } from './utils/words';

function App() {
  const [targetWord] = useState(getRandomWord());
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [currentRow, setCurrentRow] = useState(0);
  const [statuses, setStatuses] = useState(Array(6).fill(null));
  const [letterStatuses, setLetterStatuses] = useState({});
  const [message, setMessage] = useState('');

  const checkGuess = (guess) => {
    const status = [];
    const newLetterStatuses = { ...letterStatuses };
    
    // Check each letter
    for (let i = 0; i < 5; i++) {
      if (guess[i] === targetWord[i]) {
        status.push('correct');
        newLetterStatuses[guess[i]] = 'correct';
      } else if (targetWord.includes(guess[i])) {
        status.push('present');
        if (newLetterStatuses[guess[i]] !== 'correct') {
          newLetterStatuses[guess[i]] = 'present';
        }
      } else {
        status.push('absent');
        if (!newLetterStatuses[guess[i]]) {
          newLetterStatuses[guess[i]] = 'absent';
        }
      }
    }

    setLetterStatuses(newLetterStatuses);
    return status;
  };

  const handleKeyPress = (key) => {
    if (message) return;

    if (key === 'ENTER') {
      if (guesses[currentRow].length !== 5) return;

      const status = checkGuess(guesses[currentRow]);
      const newStatuses = [...statuses];
      newStatuses[currentRow] = status;
      setStatuses(newStatuses);

      if (guesses[currentRow] === targetWord) {
        setMessage('You Win!');
      } else if (currentRow === 5) {
        setMessage('You Lose! The word was ' + targetWord);
      } else {
        setCurrentRow(currentRow + 1);
      }
    } else if (key === '⌫') {
      setGuesses(prev => {
        const newGuesses = [...prev];
        newGuesses[currentRow] = newGuesses[currentRow].slice(0, -1);
        return newGuesses;
      });
    } else if (guesses[currentRow].length < 5) {
      setGuesses(prev => {
        const newGuesses = [...prev];
        newGuesses[currentRow] = newGuesses[currentRow] + key;
        return newGuesses;
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (key === 'BACKSPACE') {
        handleKeyPress('⌫');
      } else if (key === 'ENTER') {
        handleKeyPress('ENTER');
      } else if (/^[A-Z]$/.test(key)) {
        handleKeyPress(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentRow, guesses, message]);

  return (
    <div className="game-container">
      <Header />
      <div className="message">{message}</div>
      <Board guesses={guesses} statuses={statuses} />
      <Keyboard onKeyPress={handleKeyPress} letterStatuses={letterStatuses} />
    </div>
  );
}

export default App;
