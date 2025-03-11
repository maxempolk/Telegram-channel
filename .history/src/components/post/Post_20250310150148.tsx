import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, User } from 'lucide-react';
import { FC } from 'react';
import { Post as PrismaPostType } from '@prisma/client';
import getTimeAgo from '@/utils/getTimeAgo';
import Image from 'next/image';

interface PostProps {
  post: PrismaPostType;
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
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto p-4">
      <Card key={post.id}>
        <CardContent className="p-4">
          {/*<div className="flex justify-between items-start mb-3">
             <div className="flex items-center gap-2">
              <div className="size-8 flex justify-center items-end rounded-full bg-black/20">
                <User className="text-muted-foreground size-6" />
              </div>
            </div> 
          </div>*/}

          {post.images[0].content}
          <Image src={post.images[0].content} alt="cover" width={400} height={300} />

          <div className="text-sm mb-3">{post.content}</div>

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
                {getTimeAgo(post.date)}
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
