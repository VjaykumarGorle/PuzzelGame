// components/Message.jsx
const Message = ({ gameStatus, targetWord }) => {
    if (gameStatus === "won") return <div>You won! 🎉</div>;
    if (gameStatus === "lost") return <div>You lost! The word was {targetWord}. 😢</div>;
    return null;
  };

export default Message