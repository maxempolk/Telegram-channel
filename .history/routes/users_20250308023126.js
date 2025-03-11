// Создайте папку routes в корне проекта
// Создайте файл routes/users.js

const express = require('express');
const router = express.Router();

// GET /api/users
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Иван' },
    { id: 2, name: 'Мария' },
    { id: 3, name: 'Александр' }
  ]);
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  // В реальном приложении здесь был бы запрос к базе данных
  res.json({ id, name: `Пользователь ${id}` });
});

// POST /api/users
router.post('/', (req, res) => {
  const newUser = req.body;
  // В реальном приложении здесь было бы сохранение в базу данных
  res.status(201).json({ 
    id: Date.now(), // Просто для примера генерируем ID
    ...newUser,
    created: new Date()
  });
});

// PUT /api/users/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  // В реальном приложении здесь было бы обновление в базе данных
  res.json({ 
    id: Number(id), 
    ...userData, 
    updated: new Date() 
  });
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  // В реальном приложении здесь было бы удаление из базы данных
  res.json({ success: true, message: `Пользователь ${id} удален` });
});

module.exports = router;

// ---------------------------------------------
// Теперь в server.js добавьте маршруты:

// Добавьте этот импорт в начало server.js
const usersRoutes = require('./routes/users');

// И добавьте эту строку перед server.all('*', ...)
server.use('/api/users', usersRoutes);