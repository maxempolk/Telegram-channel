'use client';
import { useState, useEffect, FC } from 'react';
import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface LikeButtonProps {
  postId: number;
}

const LikeButton: FC<LikeButtonProps> = ({ postId }) => {
  const [isLiked, setIsLiked] = useState(false);

  const likeStatusKey = `post_${postId}_isLiked`;

  useEffect(() => {
    const savedLikeStatus = localStorage.getItem(likeStatusKey);
    if (savedLikeStatus !== null) {
      setIsLiked(savedLikeStatus === 'true');
    }
  }, [likeStatusKey]);

  const handleLikeClick = async () => {
    try {
      const newIsLiked = !isLiked;

      setIsLiked(newIsLiked);

      localStorage.setItem(likeStatusKey, newIsLiked.toString());
    } catch (error) {
      console.error('Ошибка при обновлении лайка:', error);
    }
  };

  return (
    <motion.button
      className="px-0 h-8 text-gray-600 cursor-pointer"
      onClick={handleLikeClick}
      whileTap={{ scale: 0.9 }}
      animate={{
        scale: isLiked ? [1, 1.2, 1] : 1,
        transition: {
          duration: 0.3,
          times: [0, 0.5, 1],
        },
      }}
    >
      <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
    </motion.button>
  );
};

export default LikeButton;
