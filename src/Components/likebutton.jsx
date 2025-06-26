import { useState } from "react";

const LikeButton = ({ post, onLike }) => {
  const heartVariants = ["🤍", "💙", "💜", "💖", "❤️"];
  const [heartIndex, setHeartIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const handleLike = () => {
    onLike(); 
    setHeartIndex((prev) => (prev + 1) % heartVariants.length);

    setAnimate(true);
    setTimeout(() => setAnimate(false), 500); 
  };

  return (
    <button
      onClick={handleLike}
      className="relative flex items-center text-center justify-center gap-1 border border-pink-500 text-pink-500 font-medium rounded-full px-4 py-1.5 hover:bg-pink-50 transition overflow-hidden"
    >
      {animate && (
        <span className="absolute inset-0 bg-pink-100 opacity-50 rounded-full animate-ping"></span>
      )}

      <span className="text-lg">{heartVariants[heartIndex]}</span>
     
      <span className="bg-pink-500 text-white text-xs font-semibold rounded-full px-2 py-0.5">
        {post.likes || 0}
      </span>
    </button>
  );
};
export default LikeButton;