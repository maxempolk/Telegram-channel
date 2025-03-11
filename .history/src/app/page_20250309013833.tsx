import Post from '@/components/post/Post';

export default function Home() {
  const fake_post = {
    id: 1,
    title: 'post1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, nostrum cum aliquid soluta, iusto sunt assumenda perspiciatis laboriosam, ipsam commodi obcaecati doloribus doloremque nulla reiciendis at dolore expedita debitis itaque.',
    createdAt: new Date(),
    updatedAt: new Date(),
    imagesUrl: ['afsfasafs'],
    tags: [] as string[],
    date: 12312242220,
  };
  return (
    <>
      <Post post={fake_post} />
    </>
  );
}
