import BlogPost from '@/components/post/Post';
import { Button } from '@/components/ui/button';
import { BlogPostType } from '@/types/post';

export default function Home() {
  const blogPosts: BlogPostType[] = [
    {
      id: 1,
      title: 'Как использовать React Hooks для управления состоянием приложения.',
      excerpt:
        'React Hooks предоставляют элегантный способ использования состояния и других возможностей React без написания классов.',
      date: '08 марта 2025',
      imageUrl: '/image.jpg',
      tags: ['React', 'Hooks', 'Frontend'],
    },
    {
      id: 2,
      title: 'Создание API с помощью FastAPI: практическое руководство.',
      excerpt:
        'FastAPI — это современный, быстрый (высокопроизводительный) веб-фреймворк для создания API с Python.',
      date: '06 марта 2025',
      imageUrl: '/image.jpg',
      tags: ['Python', 'FastAPI', 'Backend'],
    },
    {
      id: 3,
      title: 'Next.js 14: что нового и как это использовать в ваших проектах.',
      excerpt: 'Next.js 14 вносит значительные улучшения в производительность и опыт разработчика.',
      date: '01 марта 2025',
      imageUrl: '/image.jpg',
      tags: ['Next.js', 'Frontend', 'React'],
    },
    {
      id: 4,
      title: 'Tailwind CSS и shadcn/ui: создание красивых и функциональных интерфейсов.',
      excerpt:
        'Tailwind CSS в сочетании с компонентами shadcn/ui позволяет быстро создавать современные интерфейсы.',
      date: '25 февраля 2025',
      imageUrl: '/image.jpg',
      tags: ['CSS', 'UI/UX', 'Frontend'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <BlogPost key={post.id} post={post} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button variant="outline" className="rounded-full px-6">
            Загрузить еще
          </Button>
        </div>
      </main>
    </div>
  );
}
