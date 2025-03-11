interface BlogPostType {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  tags: string[];
}

const blogPosts: BlogPostType[] = [...]

const BlogPost: React.FC<{ post: BlogPostType }> = ({ post }) => {...}

const MinimalistBlog: React.FC = () => {...}


