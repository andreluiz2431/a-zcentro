import type { APIRoute } from "astro";
import TelegramBot from 'node-telegram-bot-api';

export const POST: APIRoute = async ({ request, redirect }) => {
    const formData = await request.formData();
    const message = formData.get('message')?.toString();
    const user = formData.get('name') + ' (' + formData.get('email') + ')'?.toString();;
    
    if (!message || !user) {
      return new Response("Missing required fields", {
        status: 400,
      });
    }

    // Envia o feedback para o bot do Telegram
    const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
    
    const chatId = process.env.CHAT_ID;
    const text = `Novo feedback recebido de ${user}:\n\n${message}`;
    bot.sendMessage(chatId, text);
  
    // Redireciona para uma página de sucesso ou mostra uma mensagem
    return redirect("/feedback-sucesso");
  };