import { prisma } from './prisma';
import { Post } from '@prisma/client';

export async function getPosts(page: number = 1, limit: number = 10): Promise<{
  posts: Post[];
  hasMore: boolean;
}> {
  // Находим общее количество постов
  const totalPosts = await prisma.post.count();
  
  // Рассчитываем смещение
  const skip = (page - 1) * limit;
  
  // Получаем посты с пагинацией
  const posts = await prisma.post.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: 'desc', // сортировка по дате создания (новые вначале)
    },
    include: {
      images: true,
    },
  });

  console.log( posts )

  // Проверяем, есть ли еще посты для загрузки
  const hasMore = skip + posts.length < totalPosts;
  
  return { posts, hasMore };
}
