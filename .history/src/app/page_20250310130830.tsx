import Post from '@/components/post/Post';
import { PrismaClient } from '../utils/imageToBytes';

export default async function Home() {
  const prisma = new PrismaClient();
  const post = await prisma.post.findFirst({
    where: {
      id: 1,
    },
  });

  console.log(post);
  return <>{post ? <Post post={post} /> : <p>No one post</p>}</>;
}
