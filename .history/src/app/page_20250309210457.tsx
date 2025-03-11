import Post from '@/components/post/Post';
import { getPosts } from '@/lib/db/posts';

export default function Home() {
  const posts = getPosts();
  return (
    <>
      <Post post={fake_post} />
    </>
  );
}
