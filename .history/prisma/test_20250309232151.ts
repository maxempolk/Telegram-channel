import { PrismaClient } from '@prisma/client';

function test(){
  const prisma = new PrismaClient();
  const res = prisma.post.findFirst({
    where: {
      id: 1
    },
    include:{
      images: true
    }
  })

  res.images.array.forEach(element => {
    console.log( element )
  });
}

test()

// async function getFirstPostWithImages() {
//   const prisma = new PrismaClient();
  
//   try {
//     // Получаем первый пост вместе со связанными изображениями
//     const firstPost = await prisma.post.findFirst({
//       where: {
//         id: 1 // Получаем пост с ID 1 (первый созданный)
//       },
//       include: {
//         images: true // Включаем связанные изображения
//       }
//     });
    
//     if (!firstPost) {
//       console.log('Пост не найден');
//       return;
//     }
    
//     // Выводим основную информацию о посте
//     console.log('\n📝 ИНФОРМАЦИЯ О ПОСТЕ:');
//     console.log(`ID: ${firstPost.id}`);
//     console.log(`Заголовок: ${firstPost.title}`);
//     console.log(`Дата создания: ${firstPost.createdAt}`);
//     console.log(`Теги: ${firstPost.tags}`);
//     console.log(`\nСодержание:\n${firstPost.content}`);
    
//     // Выводим информацию о связанных изображениях
//     console.log('\n🖼️ ИЗОБРАЖЕНИЯ:');
//     if (firstPost.images.length === 0) {
//       console.log('У поста нет изображений');
//     } else {
//       firstPost.images.forEach((image, index) => {
//         console.log(`\nИзображение #${index + 1}:`);
//         console.log(`ID: ${image.id}`);
//         console.log(`Имя файла: ${image.filename}`);
//         console.log(`Путь: ${image.path}`);
//         console.log(`Тип MIME: ${image.mimeType}`);
//         console.log(`Размер: ${formatFileSize(image.size)}`);
//         console.log(`URL для отображения: ${getImageUrl(image.path)}`);
//       });
      
//       console.log(`\nВсего изображений: ${firstPost.images.length}`);
//     }
    
//   } catch (error) {
//     console.error('Произошла ошибка при получении данных:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// // Функция для форматирования размера файла
// function formatFileSize(bytes: number): string {
//   if (bytes < 1024) return bytes + ' байт';
//   if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' КБ';
//   if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' МБ';
//   return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' ГБ';
// }

// // Функция для формирования полного URL изображения
// function getImageUrl(path: string | null): string {
//   if (!path) return 'URL недоступен (нет пути)';
  
//   // Базовый URL вашего приложения
//   const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  
//   // Если путь начинается с '/', убираем '/' чтобы избежать двойных слешей
//   const normalizedPath = path.startsWith('/') ? path.substring(1) : path;
  
//   return `${baseUrl}/${normalizedPath}`;
// }

// // Запуск функции
// getFirstPostWithImages()
//   .catch(e => {
//     console.error('Ошибка в выполнении скрипта:', e);
//     process.exit(1);
//   });