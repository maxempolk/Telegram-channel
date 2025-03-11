import PostList from '@/components/post/PostList';
import { PrismaClient } from '@prisma/client';

export default async function Home() {
  const prisma = new PrismaClient();
  const cursor = 0;

  const posts = await prisma.post.findMany({
    take: 10,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      images: true, // Включаем связанные изображения
    },
  });

  return <PostList initialPosts={posts} initialHasMore={true} />;
}
