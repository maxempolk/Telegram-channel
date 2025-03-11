import React from 'react';
import Image from 'next/image';
import { Post, File } from '@/types/post';
import { createImageSrc } from '@/utils/imageToBytes';

interface PostMainImageProps {
  post: Post;
  imageSize?: { width: number; height: number };
  className: string;
}

const canRenderImage = (image?: File | null): boolean => {
  return Boolean(image && image.content && image.mimeType);
};

const PostMainImage: React.FC<PostMainImageProps> = ({
  post,
  imageSize = { width: 800, height: 400 },
  className,
}) => {
  if (!post || !post.images || post.images.length === 0) {
    return null;
  }
  const mainImage = post.images[0];

  if (!canRenderImage(mainImage)) {
    return null;
  }

  if (post.id == 44) {
    console.log(post);
    console.log(mainImage\);
  }

  return (
    <Image
      src={createImageSrc({
        content: mainImage.content!,
        mimeType: mainImage.mimeType,
      })}
      alt={`Изображение: ${post.title}`}
      width={imageSize.width}
      height={imageSize.height}
      priority
      className={className}
    />
  );
};

export default PostMainImage;
