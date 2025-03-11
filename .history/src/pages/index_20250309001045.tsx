import BlogPost from '@/components/post/Post';
import { Button } from '@/components/ui/button';
import { fetchChannelUpdate } from '@/utils/parseTelegramUpdate';

export async function getStaticProps() {
  const posts = await fetchChannelUpdate();

  return {
    props: {
      posts,
    },
  };
}

const Home  = ({ posts }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        {posts.map(post => (
          <BlogPost key={post.id} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button variant="outline" className="rounded-full px-6">
          Загрузить еще
        </Button>
      </div>
    </>
  );
}


export default