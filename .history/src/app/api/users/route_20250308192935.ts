import { NextResponse } from 'next/server';

// GET запрос (получение пользователей)
export async function GET() {
  // Здесь может быть логика получения данных из базы данных
  const users = [
    { id: 1, name: 'Иван' },
    { id: 2, name: 'Мария' }
  ];
  
  return NextResponse.json(users);
}

// POST запрос (создание пользователя)
export async function POST(request) {
  try {
    // Получаем данные из тела запроса
    const body = await request.json();
    
    // Обработка данных (например, сохранение в базе данных)
    const newUser = {
      id: 3,
      name: body.name,
      // другие поля
    };
    
    // Возвращаем успешный ответ
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    // Обработка ошибок
    return NextResponse.json(
      { error: 'Не удалось создать пользователя' },
      { status: 400 }
    );
  }
}

// DELETE запрос (удаление пользователя)
export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { error: 'ID пользователя обязателен' },
      { status: 400 }
    );
  }
  
  // Логика удаления из базы данных
  
  return NextResponse.json({ message: `Пользователь с ID ${id} удален` });
}