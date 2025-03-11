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
    
    if (!body || !Array.isArray(body)) {
      // If the body is not valid, return an error response
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    
    console.log( body )

    const processedUpdates = parseUpdateData(body);
    
    console.log( body )
    // Here you can add additional logic to handle the processed updates
    // For example, storing them in a database, triggering notifications, etc.
    
    // Log updates for debugging (remove in production)
    console.log('Processed webhook updates:', processedUpdates);
    
    // Optional: Update the offset to acknowledge processed updates
    // This helps avoid processing the same updates multiple times
    let lastUpdateId = 0;
    if (body.length > 0 && body[body.length - 1].update_id) {
      lastUpdateId = body[body.length - 1].update_id;
      // You might want to store this lastUpdateId somewhere for future use
      // e.g., in a database or environment variable
      
      // Optionally fetch new updates with the updated offset
      // await fetchChannelUpdate(lastUpdateId + 1);
    }
    
    // Return a success response to Telegram
    return NextResponse.json(
      { status: 'success', processed: processedUpdates.length },
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