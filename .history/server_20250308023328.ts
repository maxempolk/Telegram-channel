const express = require('express');
const next = require('next');
const cors = require('cors');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();
  
  // Настройка middleware
  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  
  // Пример API маршрута
  server.get('/api/hello', (req, res) => {
    res.json({ message: 'Привет от Express API!' });
  });
  
  // Пример API маршрута с параметрами
  server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    res.json({ userId: id, name: `Пользователь ${id}` });
  });
  
  // Пример POST маршрута
  server.post('/api/data', (req, res) => {
    const data = req.body;
    // Обработка данных...
    res.json({ success: true, receivedData: data });
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
