'use client';
// LikeButton.jsx (Клиентский компонент с использованием localStorage)
import { useState, useEffect, FC } from 'react';

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
    <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={handleLikeClick}>
      {isLiked ? '❤️' : '🤍'}
    </button>
  );
};

export default LikeButton;
