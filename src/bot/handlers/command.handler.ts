import { Context } from 'telegraf';

// Обработчик для команды старт
export function handleCommand(ctx: Context) {
    ctx.reply('Обработка команды /start.');
}