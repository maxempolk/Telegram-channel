import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    // Создание поста для пользователя
    const newPost = await prisma.post.create({
      data: {
        title: 'Мой первый пост',
        content: 'Это содержимое моего первого поста',
      },
    })
    console.log('Создан новый пост:', newPost)

    // Получение всех пользователей с их постами
    const allUsers = await prisma.user.findMany({
      include: {
        posts: true,
      },
    })
    console.log('Все пользователи с постами:', allUsers)

  } catch (error) {
    console.error('Ошибка:', error)
  } finally {
    // Закрываем соединение с базой данных
    await prisma.$disconnect()
  }
}

main()
