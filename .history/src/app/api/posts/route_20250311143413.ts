// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getPosts } from '@/lib/posts';
import { parseUpdateData, TelegramResponse } from "@/utils/parseTelegramUpdate"

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
  try {
    // Parse the incoming webhook data
    const body: TelegramResponse = await request.json();
    
    console.log( body )
    
    if (!body) {
      // If the body is not valid, return an error response
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    console.log( body )

    const processedUpdates = parseUpdateData(body);
    
    console.log( processedUpdates?.message )
    
    console.log('Processed webhook updates:', processedUpdates);
    
    // Return a success response to Telegram
    return NextResponse.json(
      { status: 'success' },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error processing webhook:', error);
    
    // Return an error response
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}