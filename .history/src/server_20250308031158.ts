import express from 'express';
import { Request, Response } from 'express';
import next from 'next';

const dev: boolean = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port: number = parseInt(process.env.PORT || '3000', 10);

app.prepare().then(() => {
  const server = express();

  // Здесь вы можете добавить свои маршруты Express
  server.get('/api/hello', (req: Request, res: Response) => {
    res.json({ message: 'Привет от Express!' });
  });

  // Обработка всех остальных запросов через Next.js
  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(port, (err?: Error) => {
    if (err) throw err;
    console.log(`> Сервер запущен на http://localhost:${port}`);
  });
});