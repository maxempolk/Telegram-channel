'use client';
// LikeButton.jsx (Клиентский компонент с использованием localStorage)
import { useState, useEffect, FC } from 'react';

interface LikeButtonProps {
  postId: number;
  initialLikes: number;
}

const LikeButton: FC<LikeButtonProps> = ({ postId, initialLikes = 0 }) => {
  // Состояния будут инициализированы после проверки localStorage
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  // Ключи для localStorage
  const likeCountKey = `post_${postId}_likes`;
  const likeStatusKey = `post_${postId}_isLiked`;

  // Загрузка данных из localStorage при монтировании компонента
  useEffect(() => {
    // Проверяем, есть ли сохраненное состояние лайка
    const savedLikeStatus = localStorage.getItem(likeStatusKey);
    if (savedLikeStatus !== null) {
      setIsLiked(savedLikeStatus === 'true');
    }

    // Проверяем, есть ли сохраненное количество лайков
    const savedLikes = localStorage.getItem(likeCountKey);
    if (savedLikes !== null) {
      setLikes(parseInt(savedLikes, 10));
    } else {
      // Если нет, используем initialLikes и сохраняем в localStorage
      localStorage.setItem(likeCountKey, initialLikes.toString());
    }
  }, [postId, initialLikes, likeCountKey, likeStatusKey]);

  const handleLikeClick = async () => {
    try {
      // Обновление состояния
      const newIsLiked = !isLiked;
      const newLikes = newIsLiked ? likes + 1 : likes - 1;

      // Обновление состояния компонента
      setIsLiked(newIsLiked);
      setLikes(newLikes);

      // Сохранение в localStorage
      localStorage.setItem(likeStatusKey, newIsLiked.toString());
      localStorage.setItem(likeCountKey, newLikes.toString());

      // Опционально: отправка данных на сервер
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isLiked: newIsLiked }),
      });

      if (!response.ok) {
        throw new Error('Не удалось обновить лайк на сервере');
      }
    } catch (error) {
      console.error('Ошибка при обновлении лайка:', error);
      // Даже если запрос к серверу не удался, локальное состояние сохранится
    }
  };

  return (
    <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={handleLikeClick}>
      {isLiked ? '❤️' : '🤍'} {likes}
    </button>
  );
};

export default LikeButton;
