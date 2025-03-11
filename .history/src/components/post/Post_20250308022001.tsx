import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';

const Post = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'React News',
      username: '@reactjs',
      avatar: '/api/placeholder/32/32',
      content:
        'React 19 is on the horizon! Get ready for even better performance with the new compiler and server components. Check out the latest blog post for more details.',
      timestamp: '2 hours ago',
      likes: 245,
      comments: 57,
      liked: false,
      saved: false,
    },
    {
      id: 2,
      author: 'Next.js Tips',
      username: '@nextjs',
      avatar: '/api/placeholder/32/32',
      content:
        'Next.js 14 introduces Server Actions - a built-in solution for handling form submissions and data mutations without API routes. This is game-changing for full-stack applications!',
      timestamp: '3 hours ago',
      likes: 189,
      comments: 41,
      liked: false,
      saved: false,
    },
    {
      id: 3,
      author: 'Python Backend',
      username: '@pythonbackend',
      avatar: '/api/placeholder/32/32',
      content:
        'FastAPI 0.103 release brings improved dependency overrides, better docs UI, and important bug fixes. Update your projects today!',
      timestamp: '5 hours ago',
      likes: 132,
      comments: 28,
      liked: false,
      saved: false,
    },
    {
      id: 4,
      author: 'UI Design Trends',
      username: '@uidesign',
      avatar: '/api/placeholder/32/32',
      content:
        'Neumorphism is making a comeback in 2025! This soft UI style combines flat design with subtle shadows for a modern look. Here are some examples using shadcn/ui components.',
      timestamp: '6 hours ago',
      likes: 312,
      comments: 73,
      liked: false,
      saved: false,
    },
    {
      id: 5,
      author: 'Web Dev Daily',
      username: '@webdevdaily',
      avatar: '/api/placeholder/32/32',
      content:
        'CSS Container Queries are now supported in all major browsers! This means you can style elements based on their parent container size, not just viewport. Perfect for component-based design.',
      timestamp: '8 hours ago',
      likes: 201,
      comments: 45,
      liked: false,
      saved: false,
    },
  ]);

  const handleLike = (id: number) => {
    setPosts(
      posts.map(post => {
        if (post.id === id) {
          return {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const handleSave = (id: number) => {
    setPosts(
      posts.map(post => {
        if (post.id === id) {
          return { ...post, saved: !post.saved };
        }
        return post;
      })
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto bg-gray-100 p-4">
      {posts.map(post => (
        <Card key={post.id} className="border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={post.avatar} alt={post.author} />
                  <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{post.author}</div>
                  <div className="text-sm text-gray-500">{post.username}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 flex items-center">
                {post.timestamp}
                <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="text-sm mb-3">{post.content}</div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="px-0 h-8 text-gray-600"
                  onClick={() => handleLike(post.id)}
                >
                  <Heart
                    className={`h-4 w-4 mr-1 ${post.liked ? 'fill-red-500 text-red-500' : ''}`}
                  />
                  <span className="text-xs">{post.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="px-0 h-8 text-gray-600">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  <span className="text-xs">{post.comments}</span>
                </Button>
                <Button variant="ghost" size="sm" className="px-0 h-8 text-gray-600">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="px-0 h-8"
                onClick={() => handleSave(post.id)}
              >
                <Bookmark
                  className={`h-4 w-4 ${post.saved ? 'fill-blue-500 text-blue-500' : 'text-gray-600'}`}
                />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Post;
