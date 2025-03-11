import Post from '@/components/post/Post';
import { PrismaClient } from '@prisma/client';

export default async function Home() {
  const prisma = new PrismaClient();
  const post = await prisma.post.findFirst({
    where: {
      id: 1,
    },
  });

  console.log(post);
  return <>{post ? <p>No one post</p> : <Post post={post} />}</>;
}
