import { PrismaClient, Post } from '@prisma/client'

const prisma = new PrismaClient()



interface postsCacheType{
  data: null | Post[]
  lastFetched: number
}

const postsCache: postsCacheType = {
  data: null,
  lastFetched: 0
};

export async function getLatestPosts(limit = 10, offset = 0, cacheDurationSeconds = 60) {
  const currentTime = Date.now();
  
  if (
    postsCache.data && 
    postsCache.lastFetched && 
    (currentTime - postsCache.lastFetched) < (cacheDurationSeconds * 1000)
  ) {
    console.log('Возвращаем кешированные данные о постах');
    return postsCache.data;
  }
  
  const posts = await prisma.post.findMany({
    take: limit,
    skip: offset,
    orderBy: {
      createdAt: 'desc'
    },
  });
  
  postsCache.data = posts;
  postsCache.lastFetched = currentTime;
  
  return posts;
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