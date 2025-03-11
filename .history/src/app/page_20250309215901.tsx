import Post from '@/components/post/Post';
import { PrismaClient } from '@prisma/client';

export default async function Home() {
  const prisma = new PrismaClient();
  const post = await prisma.post.findFirst({
    where: {
      id: 1, // Получаем пост с ID 1 (первый созданный)
    },
    include: {
      images: true, // Включаем связанные изображения
    },
  });
  return (
    <>
      <Post post={post} />
    </>
  );
}
