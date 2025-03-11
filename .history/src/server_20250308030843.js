import 'express';
import 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // Здесь вы можете добавить свои маршруты Express
  server.get('/api/hello', (req, res) => {
    res.json({ message: 'Привет от Express!' });
  });

  // Обработка всех остальных запросов через Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Сервер запущен на http://localhost:${port}`);
  });
});

