import express, { Request, Response } from 'express';
import next from 'next';
import cors from 'cors';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

// Типизированный интерфейс для данных пользователя
interface User {
  id: number;
  name: string;
  email: string;
}

// Имитация базы данных пользователей
const users: User[] = [
  { id: 1, name: 'Иван', email: 'ivan@example.com' },
  { id: 2, name: 'Мария', email: 'maria@example.com' },
];

app.prepare().then(() => {
  const server = express();
  
  // Middleware
  server.use(cors());
  server.use(express.json());
  
  // API маршруты
  
  // GET /api/users - получить всех пользователей
  server.get('/api/users', (req: Request, res: Response) => {
    res.json(users);
  });
  
  // GET /api/users/:id - получить пользователя по ID
  server.get('/api/users/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Пользователь не найден' });
    }
  });
  
  // POST /api/users - создать нового пользователя
  // server.post('/api/users', (req, res) => {
  //   const { name, email } = req.body;
    
  //   if (!name || !email) {
  //     return res.status(400).json({ error: 'Имя и email обязательны' });
  //   }
    
  //   const newId = Math.max(...users.map(user => user.id)) + 1;
  //   const newUser: User = { id: newId, name, email };
    
  //   users.push(newUser);
  //   res.status(201).json(newUser);
  // });
  
  // Обработка маршрутов Next.js
  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });
  
  server.listen(port, () => {
    console.log(`> Сервер запущен на http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Ошибка при запуске сервера:', err);
  process.exit(1);
});