import Post from '@/components/post/Post';
import { getPosts } from '@/lib/db/posts';

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      <Post post={fake_post} />
    </>
  );
}
