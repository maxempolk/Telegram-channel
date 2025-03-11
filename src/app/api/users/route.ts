import { NextResponse } from 'next/server';

// Типизация данных для ответа
type ResponseData = {
  message: string;
  timestamp: number;
};

// GET запрос
export async function GET(): Promise<NextResponse<ResponseData>> {
  return NextResponse.json({
    message: 'Hello from Next.js API!',
    timestamp: Date.now(),
  });
}

// POST запрос с типизированным телом запроса
type RequestBody = {
  name: string;
  email?: string;
};

export async function POST(
  request: Request
): Promise<NextResponse<{ message: string } | { error: string }>> {
  try {
    // Получаем и типизируем тело запроса
    const body: RequestBody = await request.json();
    
    // Проверка данных
    if (!body.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({
      message: `Hello, ${body.name}!`,
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}

// DELETE запрос с параметрами запроса
export async function DELETE(
  request: Request
): Promise<NextResponse<{ message: string } | { error: string }>> {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json(
      { error: 'ID parameter is required' },
      { status: 400 }
    );
  }
  
  // Здесь может быть логика удаления из базы данных
  return NextResponse.json({
    message: `Item with ID ${id} has been deleted`,
  });
}
