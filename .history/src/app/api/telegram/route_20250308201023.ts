// import TelegramBot, { Message } from "node-telegram-bot-api";

import { NextApiRequest, NextApiResponse } from 'next';


export async function GET() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
 
  return Response.json(posts)
}
