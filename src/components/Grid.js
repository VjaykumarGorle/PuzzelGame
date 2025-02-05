// components/Grid.jsx
const Grid = ({ guesses }) => {
    return (
      <div className="grid">
        {guesses.map((guess, index) => (
          <div key={index} className="row">
            {guess.word.split("").map((letter, i) => (
              <div key={i} className={`cell ${guess.feedback[i]}`}>
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

export default Grid