import React from 'react';
import Image from 'next/image';
import { Post, File } from '@/types/prisma';
import { createImageSrc } from '@/utils/imageUtils';

interface PostMainImageProps {
  post?: Post | null;
  imageSize?: { width: number; height: number };
}

/**
 * Проверяет, можно ли отрендерить изображение
 */
const canRenderImage = (image?: File | null): boolean => {
  return Boolean(image && image.content && image.mimeType);
};

/**
 * Компонент для отображения только главного изображения поста
 */
const PostMainImage: React.FC<PostMainImageProps> = ({
  post,
  imageSize = { width: 800, height: 400 },
}) => {
  // Проверяем наличие поста и изображений
  if (!post || !post.images || post.images.length === 0) {
    return null;
  }

  // Получаем только первое изображение
  const mainImage = post.images[0];

  // Проверяем, можно ли его отрендерить
  if (!canRenderImage(mainImage)) {
    return null;
  }

  return (
    <div className="post-main-image mb-6">
      <Image
        src={createImageSrc({
          content: mainImage.content!,
          mimeType: mainImage.mimeType,
        })}
        alt={`Изображение: ${post.title}`}
        width={imageSize.width}
        height={imageSize.height}
        priority
        className="rounded-lg shadow-md object-cover w-full"
      />
    </div>
  );
};

export default PostMainImage;
