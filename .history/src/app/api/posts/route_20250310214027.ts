// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '@/lib/posts';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  
  await new Promise(resolve => setTimeout(resolve, 3000));

  try {
    const { posts, hasMore } = await getPosts(page, limit);
    
    return NextResponse.json({ 
      posts, 
      hasMore 
    }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {

}