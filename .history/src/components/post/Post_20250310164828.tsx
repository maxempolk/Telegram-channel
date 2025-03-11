import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { FC } from 'react';
import { Post as PostType } from '@/types/post';
import PostMainImage from './PostImage';
import PostLikeButton from '@/components/post/PostLikeButton';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

interface PostProps {
  post: PostType;
}

const Post: FC<PostProps> = ({ post }) => {
  return (
    <div className="flex flex-col gap-4 w-full md:max-w-md xl:max-w-xl mx-auto">
      <Card key={post.id}>
        <CardContent className="p-0">
          <div className="flex justify-center">
            <PostMainImage
              post={post}
              imageSize={{ width: 400, height: 200 }}
              className="w-full rounded-t-xl"
            />
          </div>

          <div className="text-sm text-justify p-4">{post.content}</div>

          <div className="flex justify-between items-center px-4 py-2 border-t border-gray-100">
            <div className="flex gap-4">
              <PostLikeButton postId={post.id} />
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
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale: ru })}
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
