import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BotService implements OnModuleInit {
    private bot: Telegraf;

    constructor(private configService: ConfigService) {
        const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');

        if(!token) {
            throw new Error('Bad token!');
        }

        console.log(token);
        this.bot = new Telegraf(token);
    }

    async onModuleInit() {
        this.bot.start(ctx => {
            ctx.reply('Привет! Отправь мне ссылку и я скажу откуда она!');
        });

        this.bot.launch();
        console.log('🤖 Бот запущен!');
    }
}
