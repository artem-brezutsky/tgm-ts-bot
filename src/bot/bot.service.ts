import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { BotUpdate } from './bot.update';

@Injectable()
export class BotService implements OnModuleInit {
    private bot: Telegraf;

    constructor(private configService: ConfigService) {
        try {
            // Получаем токен с .env
            const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');

            if (!token) {
                throw new Error('❌ Ошибка: TELEGRAM_BOT_TOKEN не найден в .env файле!');
            }

            // Создаём бота
            this.bot = new Telegraf(token);

            // Регистратор обработчиков команд
            new BotUpdate(this.bot);
        } catch (error) {
            console.error('❌ Ошибка в BotService:', error.message);
            process.exit(1);
        }
    }

    async onModuleInit() {
        try {
            // Стартуем бот
            this.bot.launch();
            console.log('🤖 Бот запущен!');
        } catch (error) {
            console.error('❌ Ошибка при запуске бота:', error.message);
            process.exit(1);
        }
    }
}
