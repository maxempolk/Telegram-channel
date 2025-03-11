import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, User } from 'lucide-react';
import { FC } from 'react';
import { Post as PostType } from '@/types/post';
import PostMainImage from './PostImage';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale'; // Для русской локализации

interface PostProps {
  post: PostType;
}

const Post: FC<PostProps> = ({ post }) => {
  // const handleLike = (id: number) => {
  //   setPosts(
  //     posts.map(post => {
  //       if (post.id === id) {
  //         return {
  //           ...post,
  //           liked: !post.liked,
  //           likes: post.liked ? post.likes - 1 : post.likes + 1,
  //         };
  //       }
  //       return post;
  //     })
  //   );
  // };

  // const handleSave = (id: number) => {
  //   setPosts(
  //     posts.map(post => {
  //       if (post.id === id) {
  //         return { ...post, saved: !post.saved };
  //       }
  //       return post;
  //     })
  //   );
  // };
  return (
    <div className="flex flex-col gap-4 w-full md:max-w-md xl:max-w-xl mx-auto">
      <Card key={post.id}>
        <CardContent>
          <div className="flex justify-center">
            <PostMainImage post={post} imageSize={{ width: 400, height: 200 }} />
          </div>

          <div className="text-sm mb-3 text-justify">{post.content}</div>

          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="px-0 h-8 text-gray-600"
                // onClick={() => handleLike(post.id)}
              >
                {/* TODO: добавить проверку лайкнут ли пост */}
                <Heart className={`h-4 w-4 mr-1 ${true ? 'fill-red-500 text-red-500' : ''}`} />
                {/* <span className="text-xs">{post.likes}</span> */}
              </Button>
              <Button variant="ghost" size="sm" className="px-0 h-8 text-gray-600">
                <MessageCircle className="h-4 w-4 mr-1" />
                {/* <span className="text-xs">{post.comments}</span> */}
              </Button>
              <Button variant="ghost" size="sm" className="px-0 h-8 text-gray-600">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="px-0 h-8"
              // onClick={() => handleSave(post.id)}
            >
              <div className="text-xs text-gray-500 flex items-center p-2">
                {/* {getTimeAgo(post.createdAt)} */}
                {/* {post.createdAt.toLocaleString()} */}
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ru })}
              </div>
              {/* <Bookmark
                className={`h-4 w-4 ${post.saved ? 'fill-blue-500 text-blue-500' : 'text-gray-600'}`}
              /> */}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
