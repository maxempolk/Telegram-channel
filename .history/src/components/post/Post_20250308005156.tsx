import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import BlogPostType from '@/types/post';

const BlogPost = ({ post: BlogPostType }) => {
  return (
    <Card className="mb-6 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {post.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-xl leading-tight line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{post.date}</span>
        <Button variant="ghost" size="sm" className="p-0 h-8">
          Читать <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogPost;
