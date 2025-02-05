// components/NewGameButton.jsx
const NewGameButton = ({ onClick }) => {
    return <button 
    style={{width:"200px",height:"80px",borderRadius:"100px",border:"none",outlineOffset:"none",cursor:"pointer",fontSize:"30px",color:"white",backgroundColor:"rgb(177, 108, 35)"}}
    onClick={onClick}>New Game</button>;
  };

  export default NewGameButton