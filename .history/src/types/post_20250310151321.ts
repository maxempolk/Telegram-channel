// types/prisma.ts

/**
 * Тип для модели Post
 */
export interface Post {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  images: File[];
  tags: string;
}

/**
 * Тип для модели File
 */
export interface File {
  id: number;
  filename: string;
  mimeType: string;
  size: number;
  content: Uint8Array | null;
  createdAt: Date;
  postId: number;
  post?: Post; // Отмечено как опциональное, так как не всегда будет загружаться
}

/**
 * Тип для создания нового поста
 */
export interface CreatePostInput {
  title: string;
  content?: string | null;
  tags: string;
}

/**
 * Тип для обновления поста
 */
export interface UpdatePostInput {
  title?: string;
  content?: string | null;
  tags?: string;
}

/**
 * Тип для создания нового файла
 */
export interface CreateFileInput {
  filename: string;
  mimeType: string;
  size: number;
  content?: Uint8Array | null;
  postId: number;
}

/**
 * Тип для поста с включенными изображениями
 */
export interface PostWithImages extends Post {
  images: File[];
}

/**
 * Тип для просмотра поста (без бинарных данных изображений)
 */
export interface PostView {
  id: number;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  tags: string;
  images: {
    id: number;
    filename: string;
    mimeType: string;
    size: number;
    createdAt: Date;
  }[];
}