import { WORDS } from "./words";

// utils/gameLogic.js
export const isValidWord = (word) => WORDS.includes(word.toUpperCase());
export const getFeedback = (guess, target) => {
    const feedback = Array(5).fill("gray");
    const targetLetters = target.split("");
  
    // Check for correct letters in correct positions (green)
    guess.split("").forEach((letter, index) => {
      if (letter === targetLetters[index]) {
        feedback[index] = "green";
        targetLetters[index] = null; // Mark as used
      }
    });
  
    // Check for correct letters in wrong positions (yellow)
    guess.split("").forEach((letter, index) => {
      if (feedback[index] !== "green" && targetLetters.includes(letter)) {
        feedback[index] = "yellow";
        targetLetters[targetLetters.indexOf(letter)] = null; // Mark as used
      }
    });
  
    return feedback;
  };