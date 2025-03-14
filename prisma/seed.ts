import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import * as path from 'path';
// import { readFile } from "fs/promises";

// async function imageToBytes(imageFile: File): Promise<Uint8Array> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
    
//     reader.onload = () => {
//       if (reader.result instanceof ArrayBuffer) {
//         const bytes = new Uint8Array(reader.result);
//         resolve(bytes);
//       } else {
//         reject(new Error('Не удалось прочитать файл как ArrayBuffer'));
//       }
//     };
    
//     reader.onerror = () => {
//       reject(new Error('Ошибка при чтении файла'));
//     };
    
//     // Читаем файл как ArrayBuffer
//     reader.readAsArrayBuffer(imageFile);
//   });
// }

async function fetchImageAsBytes(imageUrl: string): Promise<Uint8Array> {
  try {
    // Выполняем запрос к URL изображения
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`Ошибка загрузки изображения: ${response.status} ${response.statusText}`);
    }
    
    // Получаем ArrayBuffer из ответа
    const arrayBuffer = await response.arrayBuffer();
    
    // Преобразуем ArrayBuffer в Uint8Array (массив байтов)
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    console.error('Ошибка при загрузке изображения:', error);
    throw error;
  }
}

const prisma = new PrismaClient();

const POSTS_COUNT = 50; // Количество постов для генерации
const MIN_IMAGES_PER_POST = 1;
const MAX_IMAGES_PER_POST = 5;

// Путь к файлу изображения в папке public
const IMAGE_PATH = path.join(process.cwd(), 'public', 'image.jpg');

// Список популярных тегов
const TAGS = [
  'технологии', 'веб-разработка', 'программирование', 
  'javascript', 'python', 'react', 'nextjs', 
  'fastapi', 'prisma', 'базы данных', 'frontend', 
  'backend', 'дизайн', 'ui/ux', 'мобильная разработка'
];

// Функция для генерации случайных тегов
function generateRandomTags(min = 1, max = 4) {
  const tagsCount = faker.number.int({ min, max });
  const shuffledTags = TAGS.sort(() => 0.5 - Math.random());
  return shuffledTags.slice(0, tagsCount).join(', ');
}

// Функция для создания файлов изображений для поста
async function createImageFiles(postId: number, count: number) {
  const files = [];
  
  // Получаем информацию о файле изображения
  const stats = fs.statSync(IMAGE_PATH);
  const fileSize = stats.size;
  const mimeType = 'image/jpeg'; // MIME-тип для файла .jpg
  
  for (let i = 0; i < count; i++) {
    // Генерируем имя файла с порядковым номером для различения
    const filename = `image.jpg`;
    
    // Создаем файл в базе данных
    const URL_TO_FILE = "https://api.telegram.org/file/bot8153454722:AAFhLdtZBs4miMLKgiJ53rtZBwEamPXwcp8/photos/file_1.jpg"
    const file = await prisma.file.create({
      data: {
        filename,
        content: await fetchImageAsBytes( URL_TO_FILE ),
        mimeType,
        size: fileSize,
        postId
      }
    });
    
    files.push(file);
  }
  
  return files;
}

// Основная функция заполнения базы данных
async function seed() {
  console.log('🌱 Начинаем заполнение базы данных...');
  
  try {
    // Проверяем наличие файла изображения
    if (!fs.existsSync(IMAGE_PATH)) {
      console.error(`❌ Файл изображения не найден по пути: ${IMAGE_PATH}`);
      return;
    }
    
    // Очищаем базу данных перед заполнением
    await prisma.file.deleteMany({});
    await prisma.post.deleteMany({});
    
    console.log('✅ База данных очищена');
    
    // Создаем посты
    for (let i = 0; i < POSTS_COUNT; i++) {
      const title = faker.lorem.sentence({ min: 3, max: 8 });
      const content = faker.lorem.paragraphs({ min: 2, max: 10 }, '\n\n');
      const tags = generateRandomTags();
      
      // Создаем пост
      const post = await prisma.post.create({
        data: {
          title,
          content,
          tags
        }
      });
      
      // Определяем случайное количество изображений для поста
      const imagesCount = faker.number.int({ min: MIN_IMAGES_PER_POST, max: MAX_IMAGES_PER_POST });
      
      // Создаем записи о файлах изображений для поста
      await createImageFiles(post.id, imagesCount);
      
      if (i % 10 === 0) {
        console.log(`✅ Создано ${i} постов из ${POSTS_COUNT}`);
      }
    }
    
    console.log(`✅ Создано всего ${POSTS_COUNT} постов с изображениями`);
    
    // Вывод статистики
    const postsCount = await prisma.post.count();
    const filesCount = await prisma.file.count();
    
    console.log('\n📊 Статистика:');
    console.log(`- Постов: ${postsCount}`);
    console.log(`- Файлов: ${filesCount}`);
    console.log(`- Среднее количество файлов на пост: ${(filesCount / postsCount).toFixed(2)}`);
    
  } catch (error) {
    console.error('❌ Ошибка при заполнении базы данных:', error);
  } finally {
    await prisma.$disconnect();
    console.log('🔚 Завершение заполнения базы данных');
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });