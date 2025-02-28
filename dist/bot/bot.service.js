"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotService = void 0;
const common_1 = require("@nestjs/common");
const telegraf_1 = require("telegraf");
const config_1 = require("@nestjs/config");
const bot_update_1 = require("./bot.update");
let BotService = class BotService {
    configService;
    bot;
    constructor(configService) {
        this.configService = configService;
        try {
            const token = this.configService.get('TELEGRAM_BOT_TOKEN');
            if (!token) {
                throw new Error('❌ Ошибка: TELEGRAM_BOT_TOKEN не найден в .env файле!');
            }
            this.bot = new telegraf_1.Telegraf(token);
            new bot_update_1.BotUpdate(this.bot);
        }
        catch (error) {
            console.error('❌ Ошибка в BotService:', error.message);
            process.exit(1);
        }
    }
    async onModuleInit() {
        try {
            this.bot.launch();
            console.log('🤖 Бот запущен!');
        }
        catch (error) {
            console.error('❌ Ошибка при запуске бота:', error.message);
            process.exit(1);
        }
    }
};
exports.BotService = BotService;
exports.BotService = BotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], BotService);
//# sourceMappingURL=bot.service.js.map