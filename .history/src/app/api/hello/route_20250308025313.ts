// import { NextResponse } from 'next/server';
import express, { Request, Response } from 'express';

// Пример данных (имитация базы данных)
const users = [
  { id: 1, name: 'Иван', email: 'ivan@example.com' },
  { id: 2, name: 'Мария', email: 'maria@example.com' },
  { id: 3, name: 'Алексей', email: 'alex@example.com' }
];

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// GET /api/hello
// export async function GET() {
//   return NextResponse.json({ users });
// }

// // POST /api/hello
// export async function POST(request: Request) {
//   try {
//     // Получение данных из запроса
//     const data = await request.json();
    
//     // Добавление нового пользователя
//     const newUser = {
//       id: users.length + 1,
//       name: data.name || 'Новый пользователь',
//       email: data.email || 'new@example.com'
//     };
    
//     users.push(newUser);
    
//     // Возвращаем созданного пользователя
//     return NextResponse.json(newUser, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Ошибка при создании пользователя' }, 
//       { status: 400 }
//     );
//   }
// }
