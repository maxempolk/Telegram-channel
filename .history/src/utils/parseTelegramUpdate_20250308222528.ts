const token = process.env.TELEGRAM_BOT_TOKEN;


export async function fetchChannelUpdate() {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/getUpdates?offset=${offset || 0}`
    );
    
    const data = await response.json();
    
    if (data.ok) {
      const updates = data.result;
      const nextOffset = updates.length > 0 ? 
        updates[updates.length - 1].update_id + 1 : 
        typeof offset === 'string' ? parseInt(offset) || 0 : 0;
      
      return new Response(
        JSON.stringify({ updates, nextOffset }), 
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: `Telegram API error: ${data.description || 'Unknown error'}` }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch updates';
    return new Response(
      JSON.stringify({ error: errorMessage }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}