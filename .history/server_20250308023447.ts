import express, { Request, Response, NextFunction } from 'express';
import next from 'next';
import cors from 'cors';

const dev: boolean = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.prepare().then(() => {
  const server = express();
  
  // Настройка middleware
  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  
  // Пример API маршрута
  server.get('/api/hello', (req: Request, res: Response) => {
    res.json({ message: 'Привет от Express API!' });
  });
  
  // Пример API маршрута с параметрами
  server.get('/api/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({ userId: id, name: `Пользователь ${id}` });
  });
  
  // Пример POST маршрута
  server.post('/api/data', (req: Request, res: Response) => {
    const data = req.body;
    // Обработка данных...
    res.json({ success: true, receivedData: data });
  });
  
  // Все остальные запросы передаем в Next.js
  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });
  
  server.listen(PORT, (err?: Error) => {
    if (err) throw err;
    console.log(`> Сервер запущен на http://localhost:${PORT}`);
  });
});