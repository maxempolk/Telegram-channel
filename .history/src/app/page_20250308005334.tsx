import BlogPost from "@/components/post/Post";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { BlogPostType } from "@/types/post"

export default function Home() {
  return (


// Пример данных для блога
const blogPosts: BlogPostType[] = [
  {
    id: 1,
    title: "Как использовать React Hooks для управления состоянием приложения.",
    excerpt: "React Hooks предоставляют элегантный способ использования состояния и других возможностей React без написания классов.",
    date: "08 марта 2025",
    imageUrl: "/api/placeholder/600/400",
    tags: ["React", "Hooks", "Frontend"]
  },
  {
    id: 2,
    title: "Создание API с помощью FastAPI: практическое руководство.",
    excerpt: "FastAPI — это современный, быстрый (высокопроизводительный) веб-фреймворк для создания API с Python.",
    date: "06 марта 2025",
    imageUrl: "/api/placeholder/600/400",
    tags: ["Python", "FastAPI", "Backend"]
  },
  {
    id: 3,
    title: "Next.js 14: что нового и как это использовать в ваших проектах.",
    excerpt: "Next.js 14 вносит значительные улучшения в производительность и опыт разработчика.",
    date: "01 марта 2025",
    imageUrl: "/api/placeholder/600/400",
    tags: ["Next.js", "Frontend", "React"]
  },
  {
    id: 4,
    title: "Tailwind CSS и shadcn/ui: создание красивых и функциональных интерфейсов.",
    excerpt: "Tailwind CSS в сочетании с компонентами shadcn/ui позволяет быстро создавать современные интерфейсы.",
    date: "25 февраля 2025",
    imageUrl: "/api/placeholder/600/400",
    tags: ["CSS", "UI/UX", "Frontend"]
  }
];

};

// Главный компонент блога
const MinimalistBlog = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="container mx-auto py-6">
        <h1 className="text-3xl font-bold tracking-tight mb-1">Мой Минималистичный Блог</h1>
        <p className="text-muted-foreground">Заметки о веб-разработке, React, Next.js и Python</p>
        <Separator className="my-6" />
      </header>
      
      <main className="container mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogPost key={post.id} post={post} />
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <Button variant="outline" className="rounded-full px-6">
            Загрузить еще
          </Button>
        </div>
      </main>
      
      <footer className="border-t mt-12">
        <div className="container mx-auto py-6 text-center text-sm text-muted-foreground">
          © 2025 Минималистичный Блог • Создано с использованием Next.js и shadcn/ui
        </div>
      </footer>
    </div>
  );
};

export default MinimalistBlog;
  );
}
