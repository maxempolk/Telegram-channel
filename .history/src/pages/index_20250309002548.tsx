import BlogPost from '@/components/post/Post';
import { Button } from '@/components/ui/button';
import { fetchChannelUpdate } from '@/utils/parseTelegramUpdate';
import { Post as PostPrismaModel } from '@prisma/client';
import { FC } from 'react';
import '@/styles/global.css';

export async function getStaticProps() {
  const posts = await fetchChannelUpdate();

  return {
    props: {
      posts,
    },
  };
}

interface HomeProps {
  posts: PostPrismaModel[];
}

const Home: FC<HomeProps> = ({ posts }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        {posts.map((post: PostPrismaModel) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button variant="outline" className="rounded-full px-6">
          Загрузить еще
        </Button>
      </div>
    </>
  );
};

export default Home;
