const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  // Настройка middleware
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // Ваши кастомные API маршруты Express
  server.get('/api/custom', (req, res) => {
    res.json({ message: 'Это кастомный API маршрут Express!' });
  });

  server.post('/api/custom/data', (req, res) => {
    const data = req.body;
    // Обработка данных...
    res.json({ success: true, receivedData: data });
  });

  // Пример API маршрута с параметрами
  server.get('/api/custom/users/:id', (req, res) => {
    const { id } = req.params;
    res.json({ userId: id, name: `Пользователь ${id}` });
  });

  // Все остальные запросы передаем в Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Сервер запущен на http://localhost:${PORT}`);
  });
});