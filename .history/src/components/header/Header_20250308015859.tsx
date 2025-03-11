import { Separator } from '../ui/separator';

const Header = () => {
  return (
    <header className="container mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-1">Mini blog</h1>
      <Separator className="my-6" />
    </header>
  );
};

export default Header;
