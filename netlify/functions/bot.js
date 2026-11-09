exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);

    if (data.message && data.message.text) {
      const chatId = data.message.chat.id;
      const userName = data.message.from.first_name || 'Amigo';
      const text = data.message.text;

      if (text.startsWith('/start')) {
        const botToken = process.env.BOT_TOKEN;

        const messageBody = {
          chat_id: chatId,
          text: `¡Hola, ${userName}! Qué gusto saludarte.\n\nToca el botón de aquí abajo para abrir la Mini App:`,
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "🚀 Abrir Mini App",
                  web_app: { url: "https://tu-proyecto.netlify.app" } 
                }
              ]
            ]
          }
        };

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(messageBody)
        });
      }
    }

    return { statusCode: 200, body: 'OK' };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
