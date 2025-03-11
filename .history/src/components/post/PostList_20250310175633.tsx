// components/PostList.tsx
'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Post as PostType } from '@/types/post';
// import Post from './Post';

interface PostListProps {
  initialPosts: PostType[];
  initialHasMore: boolean;
}

export default function PostList({ initialPosts, initialHasMore }: PostListProps) {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const [page, setPage] = useState<number>(2); // начинаем со второй страницы
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(initialHasMore);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && !loading && hasMore) {
      loadMorePosts();
    }
  }, [inView]);

  async function loadMorePosts() {
    try {
      setLoading(true);
      const response = await fetch(`/api/posts?page=${page}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setPosts(prevPosts => [...prevPosts, ...data.posts]);
      setHasMore(data.hasMore);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Ошибка при загрузке постов:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Показываем все посты */}
      {posts.map(post => Post)}

      {/* Загрузчик */}
      {hasMore && (
        <div ref={ref} className="py-4 text-center text-gray-500">
          {loading ? 'Загрузка...' : 'Прокрутите для загрузки дополнительных постов'}
        </div>
      )}

      {/* Сообщение, когда больше нет постов */}
      {!hasMore && posts.length > 0 && (
        <div className="py-4 text-center text-gray-500">Больше постов нет</div>
      )}

      {/* Если постов вообще нет */}
      {posts.length === 0 && <div className="py-4 text-center text-gray-500">Посты не найдены</div>}
    </div>
  );
}
