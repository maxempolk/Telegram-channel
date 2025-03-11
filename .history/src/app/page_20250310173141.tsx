import Post from '@/components/post/Post';
import { PrismaClient } from '@prisma/client';

export default async function Home() {
  const prisma = new PrismaClient();
  const cursor = 0;

  const posts = await prisma.post.findMany({
    take: 10,
    skip: cursor ? 1 : 0, // Пропускаем курсор, если он есть
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      createdAt: 'desc', // Сортировка от новых к старым
    },
    include: {
      images: true, // Включаем связанные изображения
    },
  });

  console.log(posts);

  return (
    <>
      {posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </>
  );
}
