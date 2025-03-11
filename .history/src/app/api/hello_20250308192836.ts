export default function handler(req, res) {
  // Получаем метод запроса (GET, POST, PUT, DELETE и т.д.)
  const { method } = req;

  switch (method) {
    case 'GET':
      // Обработка GET запроса
      res.status(200).json({ message: 'Hello from Next.js API!' });
      break;
    case 'POST':
      // Обработка POST запроса
      const { name } = req.body;
      res.status(200).json({ message: `Hello, ${name}!` });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
