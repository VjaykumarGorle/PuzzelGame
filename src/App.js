// App.js
import React, { useEffect, useRef, useState } from "react";
import NewGameButton from "./components/NewGameButton";
import {
  threeLetterWords,
  fourLetterWords,
  fiveLetterWords,
} from "./Utils/words";
import "./App.css";

const App = () => {
  const [guesses, setGuesses] = useState([]);
  const [attemptsRemaining, setAttemptsRemaining] = useState(6);
  const [orginalWord, setOrginalWord] = useState("");
  const [randomAlphabets, setRandomAlphabets] = useState("");
  const [predictedWord, setPredictedWord] = useState("");
  const [gameSuccess, setGameSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState({
    level: "no",
    length: 3,
  });
  const [gameStatus, setGameStatus] = useState(false);
  const homeRefs = useRef([]);
  const startNewGame = () => {
    setGameStatus(true);
    setGameSuccess(false);
  };

  useEffect(() => {
    setLoading(true);
    const randomNumber = Math.round(Math.random() * 100);
    let localGetWord = "";
    if (level.length === 3) {
      localGetWord = threeLetterWords[randomNumber];
      setOrginalWord(localGetWord);
    } else if (level.length === 4) {
      localGetWord = fourLetterWords[randomNumber];
      setOrginalWord(localGetWord);
    } else if (level.length === 5) {
      localGetWord = fiveLetterWords[randomNumber];
      setOrginalWord(localGetWord);
    } else {
      localGetWord = "";
      setOrginalWord("");
      setGameStatus(false);
    }
    if (localGetWord) {
      const { modifiedWord, randomAlphabetsString } =
        getRandomAlphabets(localGetWord);
      setPredictedWord(modifiedWord);
      setRandomAlphabets(randomAlphabetsString);
    }
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, [level]);

  const getRandomAlphabets = (word) => {
    const wordLength = word.length;

    // Convert word into an array of characters
    const letters = word.split("");

    // Generate a random index to replace with _
    const randomIndex = Math.floor(Math.random() * wordLength);

    // Create a modified version of the word with _ at the random index
    const modifiedWord = [...letters];
    const missingLetter = modifiedWord[randomIndex];
    modifiedWord[randomIndex] = "_";

    // Generate random letters for the rest of the string (to fill the same length)
    const randomAlphabets = [];
    while (randomAlphabets.length < wordLength) {
      const randomLetter = String.fromCharCode(
        97 + Math.floor(Math.random() * 26)
      ); // Random alphabet
      if (randomAlphabets.length === randomIndex) {
        randomAlphabets.push(missingLetter); // Ensure the missing letter is in the same position
      } else {
        randomAlphabets.push(randomLetter); // Fill the other positions with random letters
      }
    }

    // Return both the modified word and the random alphabets string
    return {
      modifiedWord: modifiedWord.join(""),
      randomAlphabetsString: randomAlphabets.join(""),
    };
  };

  return (
    <div className="App" style={{position:"relative"}} >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "10px",
        }}
      >
        <h1
          style={{
            color: "white",
            backgroundColor: "rgb(182, 108, 18)",
            padding: "15px",
            borderRadius: "10px 30px 10px 30px",
          }}
        >
          Wordle Clone
        </h1>
      </div>

      {gameStatus  && (
        <div
          style={{
            width: "100%",
            height: "80%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "500px",
              height: "500px",
              borderRadius: "50% 50% 10% 10%",
              backgroundColor: "rgba(225,225,225,.6)",
              display: "flex",
              position: "relative",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {randomAlphabets?.split("").map((data, index) => {
              let angle = Math.PI * (index / (level.length - 1)); // Spreads elements from 0 to π (half-circle)
              let radius = 200; // Controls arc size
              let centerX = 250; // Center of the parent div
              let centerY = 250;

              return (
                <div
                  key={index}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    top: centerY - radius * Math.sin(angle) - 50, // Offset by half height
                    left: centerX + radius * Math.cos(angle) - 50, // Offset by half width
                  }}
                  onClick={() => {
                    if (data) {
                      setPredictedWord((state) => {
                        let old = state;
                        old = old.replace("_", data);
                        console.log(old, orginalWord);
                        if (old === orginalWord) {
                          setGameSuccess(true);
                          setGameStatus(false);
                          return old;
                        } else {
                          return state;
                        }
                      });
                    }
                  }}
                >
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(225,225,225,.6)",
                      filter: "blur(10px)",
                      position: "absolute",
                      boxShadow: "1px 1px 100px white",
                      zIndex: 0,
                    }}
                  />
                  <span
                    style={{
                      zIndex: 1,
                      width: "30px",
                      height: "30px",
                      border: "none",
                      backgroundColor: "transparent",
                      fontSize: "24px",
                      textAlign: "center",
                      borderRadius: "30px",
                      color: "white",
                      fontWeight: "bolder",
                      fontFamily: "monospace",
                      cursor: "pointer",
                    }}
                    children={data}
                  />
                </div>
              );
            })}

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                position: "absolute",
                bottom: 10,
                backgroundColor: "red",
                width: "90%",
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {predictedWord?.split("")?.map((data, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(225,225,225,.6)",
                        filter: "blur(10px)",
                        position: "absolute",
                        boxShadow: "1px 1px 100px white",
                        zIndex: 0,
                      }}
                    />
                    <span
                      style={{
                        zIndex: 1,
                        width: "30px",
                        height: "30px",
                        border: "none",
                        backgroundColor: "transparent",
                        fontSize: "24px",
                        textAlign: "center",
                        borderRadius: "30px",
                        color: "white",
                        fontWeight: "bolder",
                        fontFamily: "monospace",
                        cursor: "pointer",
                      }}
                      children={data}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {!gameStatus && !gameSuccess  && (
        <div
          style={{
            width: "100%",
            height: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                columnGap: "40px",
              }}
            >
              {[
                {
                  level: "easy",
                  length: 3,
                },
                {
                  level: "medium",
                  length: 4,
                },
                {
                  level: "hard",
                  length: 5,
                },
              ].map((data, index) => {
                return (
                  <div
                    ref={(el) => (homeRefs.current[data.level] = el)}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={() => {
                      setLevel(data);
                      const refCheck = homeRefs.current[data.level];
                      if (refCheck) {
                        const refCheckStyles = refCheck.style;
                        refCheckStyles.transform = "scale(110%)";
                        refCheckStyles.transitionDuration = ".7s";
                        refCheckStyles.backgroundColor =
                          data.level === "easy"
                            ? "green"
                            : data.level === "medium"
                            ? "rgb(154, 164, 16)"
                            : "red";

                        if (data.level === "easy") {
                          homeRefs.current["easy"].backgroundColor = "green";
                        } else {
                          const easyrefCheckStyles =
                            homeRefs.current["easy"].style;
                          easyrefCheckStyles.transform = "scale(100%)";
                          easyrefCheckStyles.transitionDuration = ".3s";
                          easyrefCheckStyles.backgroundColor = "transparent";
                        }
                        if (data.level === "medium") {
                          homeRefs.current["medium"].backgroundColor =
                            "rgb(154, 164, 16)";
                        } else {
                          const easyrefCheckStyles =
                            homeRefs.current["medium"].style;
                          easyrefCheckStyles.transform = "scale(100%)";
                          easyrefCheckStyles.transitionDuration = ".3s";
                          easyrefCheckStyles.backgroundColor = "transparent";
                        }
                        if (data.level === "hard") {
                          homeRefs.current["hard"].backgroundColor = "red";
                        } else {
                          const easyrefCheckStyles =
                            homeRefs.current["hard"].style;
                          easyrefCheckStyles.transform = "scale(100%)";
                          easyrefCheckStyles.transitionDuration = ".3s";
                          easyrefCheckStyles.backgroundColor = "transparent";
                        }
                      }
                    }}
                    onMouseOver={() => {
                      const refCheck = homeRefs.current[data.level];
                      if (refCheck) {
                        const refCheckStyles = refCheck.style;
                        refCheckStyles.transform = "scale(110%)";
                        refCheckStyles.transitionDuration = ".7s";
                        refCheckStyles.backgroundColor =
                          data.level === "easy"
                            ? "green"
                            : data.level === "medium"
                            ? "rgb(154, 164, 16)"
                            : "red";
                      }
                    }}
                    onMouseOut={() => {
                      const refCheck = homeRefs.current[data.level];
                      if (refCheck && !(data.level === level.level)) {
                        const refCheckStyles = refCheck.style;
                        refCheckStyles.transform = "scale(100%)";
                        refCheckStyles.transitionDuration = ".3s";
                        refCheckStyles.backgroundColor = "transparent";
                      }
                    }}
                  >
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "100px",
                        backgroundColor: "rgba(225,225,225,.6)",
                        filter: "blur(10px)",
                        position: "absolute",
                        boxShadow: "1px 1px 100px white",
                      }}
                    />
                    <span
                      style={{
                        color: "white",
                        fontSize: "24px",
                        textTransform: "capitalize",
                      }}
                    >
                      {data.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <NewGameButton onClick={startNewGame} />
          </div>
        </div>
      )}

      {gameSuccess && (
        <div
          style={{
            width: "100%",
            height: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            rowGap: "10px",
          }}
        >
          <h1 style={{ color: "green" }}>SUCCESS</h1>
          <NewGameButton
            onClick={() => {
              setGameStatus(false);
              setGameSuccess(false);
              window.location.reload();
            }}
          />
        </div>
      )}

      {loading && (
        <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position:"absolute",
          zIndex:999,
          top:0,
          backgroundColor:"rgba(225,225,225,.4)",
        }}
        >
          <span>
            Loading...
          </span>
        </div>
      )}
    </div>
  );
};

export default App;
