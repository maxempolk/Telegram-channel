import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Получает последние n постов со смещением offset
 * @param {number} limit - количество постов для получения
 * @param {number} offset - смещение от начала (пропустить первые offset постов)
 * @param {Object} options - дополнительные параметры (например, включение связанных данных)
 * @returns {Promise<Array>} - массив постов
 */
export async function getLatestPosts(limit = 10, offset = 0) {
  return prisma.post.findMany({
    take: limit,
    skip: offset,
    orderBy: {
      createdAt: 'desc'
    },
  });
}

interface IPostCreate{
  title: string
  content: string
  imagesUrl: string[]
  tags: string[]
}

export async function createPost(data: IPostCreate) {
  const session = await prisma.$transaction(async (tx) => {
    try {
      const post = await tx.post.create({
        data: {
          title: data.title,
          content: data.content,
          imagesUrl: data.imagesUrl.join(","),
          tags: data.tags.join(","),
        }
      });
      
      return post;
    } catch (error) {
      console.error("Ошибка при создании поста:", error);
      throw error;
    }
  });
  
  return session;
}