const token = process.env.TELEGRAM_BOT_TOKEN;

function parseUpdateData(  ){
  
}

export async function fetchChannelUpdate() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/getUpdates?offset=${offset || 0}`
    );
    
    const data = await response.json();
    
    if (data.ok) {
      const updates = data.result;
      


      return new Response(
        JSON.stringify({ updates }), 
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