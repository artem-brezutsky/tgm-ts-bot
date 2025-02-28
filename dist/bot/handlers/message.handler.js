"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = handleMessage;
const instagram_service_1 = require("../../services/instagram.service");
async function handleMessage(ctx) {
    if (!ctx.message || typeof ctx.message !== 'object') {
        return;
    }
    if ('text' in ctx.message) {
        const messageText = ctx.message.text;
        const isGroup = ctx.chat?.type.includes('group');
        const isPrivate = ctx.chat?.type === 'private';
        const senderName = ctx.message.from.username
            ? `@${ctx.message.from.username}`
            : ctx.message.from.first_name;
        if (!isGroup || isPrivate) {
            return;
        }
        const tiktokRegex = /https?:\/\/(?:www\.|vm\.)?tiktok\.com\/(@[\w.-]+\/video\/\d+|[\w@?=./-]+)/i;
        const instagramRegex = /https?:\/\/(?:www\.)?instagram\.com\/[\w@?=./-]+/i;
        if (tiktokRegex.test(messageText)) {
            return;
        }
        else if (instagramRegex.test(messageText)) {
            try {
                const replyMessageId = ctx.message.message_id;
                const chatId = ctx.chat?.id;
                if (!chatId)
                    return;
                const loadingMessage = await ctx.reply('⏳ Загружаю видео, подождите...', {
                    reply_parameters: {
                        message_id: replyMessageId
                    }
                });
                const videoData = await (0, instagram_service_1.downloadInstagramVideo)(messageText);
                if (videoData) {
                    await ctx.telegram.editMessageMedia(ctx.chat.id, loadingMessage.message_id, undefined, {
                        type: "video",
                        media: { source: videoData.buffer, filename: videoData.filename },
                        caption: `🎥 Видео от ${senderName}`
                    });
                }
                else {
                    await ctx.telegram.editMessageText(ctx.chat.id, loadingMessage.message_id, undefined, '❌ Не удалось получить видео. Проверьте ссылку и попробуйте снова.');
                }
            }
            catch (error) {
                console.error('Ошибка обработки ссылки:', error);
                await ctx.reply('❌ Произошла ошибка. Попробуйте снова позже.');
            }
        }
    }
}
//# sourceMappingURL=message.handler.js.map