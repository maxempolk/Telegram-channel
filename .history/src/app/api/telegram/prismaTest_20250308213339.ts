import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function main() {
  try {
    // Создание поста для пользователя
    const newPost = await prisma.post.create({
      data: {
        title: 'Мой первый пост',
        content: 'Это содержимое моего первого поста',
        imagesUrl: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
        tags: "cool image"
      },
    })
    return `Создан новый пост: ${newPost}`
  } catch (error) {
    console.error('Ошибка:', error)
  } finally {
    await prisma.$disconnect()
  }
}