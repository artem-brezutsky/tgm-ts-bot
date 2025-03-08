import { Context } from 'telegraf';
import { downloadInstagramVideo } from 'src/services/instagram.service';

export async function handleMessage(ctx: Context) {
    if (!ctx.message || typeof ctx.message !== 'object') {
        return;
    }

    // Проверяем что это текстовое сообщение 
    if ('text' in ctx.message) {
        const messageText = ctx.message.text;

        // 🟢 Определяем, сообщение из группы или нет
        const isGroup = ctx.chat?.type.includes('group');
        const isPrivate = ctx.chat?.type === 'private';

        // 🟢 Определяем имя отправителя
        const senderName = ctx.message.from.username
            ? `@${ctx.message.from.username}`
            : ctx.message.from.first_name;

        if (!isGroup || isPrivate) {
            return;
        }

        // 🔹 Регулярные выражения для TikTok и Instagram
        const tiktokRegex = /https?:\/\/(?:www\.|vm\.)?tiktok\.com\/(@[\w.-]+\/video\/\d+|[\w@?=./-]+)/i;
        const instagramRegex = /https?:\/\/(?:www\.)?instagram\.com\/(stories|reel)\/[\w@?=./-]+/i;

        // Обработка ссылок с TikTok
        if (tiktokRegex.test(messageText)) {
            // Пока не обрабатываем Тик Ток
            return;
            // ctx.reply('✅ Это ссылка на TikTok!');
        }
        // Обработка ссылок с Instagram
        else if (instagramRegex.test(messageText)) {
            try {
                // 🔹 Удаляем сообщение пользователя с ссылкой
                // await ctx.deleteMessage(ctx.message.message_id);
                const replyMessageId = ctx.message.message_id;
                const chatId = ctx.chat?.id;

                if (!chatId) return;

                // 🔹 Отправляем сообщение о загрузке видео
                const loadingMessage = await ctx.reply(
                    '⏳ Загружаю видео, подождите...',
                    {
                        reply_parameters: {
                            message_id: replyMessageId
                        }
                    }
                );

                // 🔹 Загружаем видео
                const videoData = await downloadInstagramVideo(messageText);

                if (videoData) {
                    // 🔹 Отправляем видео с подписью
                    await ctx.telegram.editMessageMedia(
                        ctx.chat.id,
                        loadingMessage.message_id,
                        undefined,
                        {
                            type: "video",
                            media: { source: videoData.buffer, filename: videoData.filename },
                            caption: `🎥 Видео от ${senderName}`,
                            width: 720,
                            height: 1152,
                            
                        }
                    );
                } else {
                    // 🔹 Если видео не удалось загрузить, меняем сообщение
                    await ctx.telegram.editMessageText(
                        ctx.chat.id,
                        loadingMessage.message_id,
                        undefined,
                        '❌ Не удалось получить видео. Проверьте ссылку и попробуйте снова.'
                    );
                }
            } catch (error) {
                console.error('Ошибка обработки ссылки:', error);
                await ctx.reply('❌ Произошла ошибка. Попробуйте снова позже.');
            }
        }
    }
}   