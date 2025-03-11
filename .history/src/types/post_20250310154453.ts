export interface Post {
  id: number;
  title: string;
  content: string | null;
  createdAt: number;
  updatedAt: number;
  images: File[];
  tags: string;
}

export interface File {
  id: number;
  filename: string;
  mimeType: string;
  size: number;
  content: Uint8Array | null;
  createdAt: Date;
  postId: number;
  post?: Post; 
}

export interface CreatePostInput {
  title: string;
  content?: string | null;
  tags: string;
}

export interface UpdatePostInput {
  title?: string;
  content?: string | null;
  tags?: string;
}

export interface CreateFileInput {
  filename: string;
  mimeType: string;
  size: number;
  content?: Uint8Array | null;
  postId: number;
}

export interface PostWithImages extends Post {
  images: File[];
}

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