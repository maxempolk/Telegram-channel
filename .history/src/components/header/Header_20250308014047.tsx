import { Separator } from '../ui/separator';

const headerComponent = () => {
  return (
    <header className="container mx-auto py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-1">Мой Минималистичный Блог</h1>
      <p className="text-muted-foreground">Заметки о веб-разработке, React, Next.js и Python</p>
      <Separator className="my-6" />
    </header>
  );
};
