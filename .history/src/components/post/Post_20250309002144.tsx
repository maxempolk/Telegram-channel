import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Post as PostPrismaModel } from '@prisma/client';
import { FC } from 'react';

interface PostProps {
  post: PostPrismaModel;
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
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto bg-gray-100 p-4">
      <Card key={post.id} className="border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              {/* <Avatar className="h-10 w-10">
                <AvatarImage src={post.avatar} alt={post.author} />
                <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
              </Avatar> */}
              <div>
                <div className="font-medium">ПУСТОЙ АВТОР</div>
                <div className="text-sm text-gray-500">ПУСТОЙ ЮЗЕР НЕЙМ АВТОРА</div>
              </div>
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              ПУСТОЕ ВРЕМЯ ПУБЛИКАЦИИ
              <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-sm mb-3">{post.content}123</div>

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
