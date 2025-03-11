import { PrismaClient } from '@prisma/client'

// try {
//   const newPost = await prisma.post.create({
//     data: {
//       title: 'Мой первый пост',
//       content: 'Это содержимое моего первого поста',
//       imagesUrl: "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
//       tags: "cool image"
//     },
//   })
//   return `Создан новый пост: ${newPost}`
// } catch (error) {
//   console.error('Ошибка:', error)
// } finally {
//   await prisma.$disconnect()
// }

const prisma = new PrismaClient()

/**
 * Получает последние n постов со смещением offset
 * @param {number} limit - количество постов для получения
 * @param {number} offset - смещение от начала (пропустить первые offset постов)
 * @param {Object} options - дополнительные параметры (например, включение связанных данных)
 * @returns {Promise<Array>} - массив постов
 */
export async function getLatestPosts(limit = 10, offset = 0, options = {}) {
  // const { includeTags = false, includeAuthor = false } = options;
  
  return prisma.post.findMany({
    take: limit,
    skip: offset,
    orderBy: {
      createdAt: 'desc'
    },
    // include: {
    //   // Условное включение связанных данных
    //   tags: includeTags,
    //   author: includeAuthor,
    // },
  });
}

interface IPostCreate{
  title: string
  content: string
  imagesUrl: string[]
  tags: string[]
}

export async function createPost(data: IPostCreate) {
  // Начинаем транзакцию
  const session = await prisma.$transaction(async (tx) => {
    try {
      const post = await tx.post.create({
        data: {
          title: data.title,
          content: data.content,
          imagesUrl: data.imagesUrl.join(","),
          tags: data.tags.join(","),
          // Дополнительные поля, такие как authorId, могут быть добавлены здесь
        }
      });
      
      return post;
    } catch (error) {
      // В случае ошибки транзакция автоматически откатится
      console.error("Ошибка при создании поста:", error);
      throw error; // Перебрасываем ошибку для обработки на более высоком уровне
    }
  });
  
  return session;
}