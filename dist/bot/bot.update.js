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
exports.BotUpdate = void 0;
const telegraf_1 = require("telegraf");
const common_1 = require("@nestjs/common");
const command_handler_1 = require("./handlers/command.handler");
const message_handler_1 = require("./handlers/message.handler");
let BotUpdate = class BotUpdate {
    bot;
    constructor(bot) {
        this.bot = bot;
        this.registerHandlers();
    }
    registerHandlers() {
        this.bot.start(command_handler_1.handleCommand);
        this.bot.on('message', message_handler_1.handleMessage);
    }
};
exports.BotUpdate = BotUpdate;
exports.BotUpdate = BotUpdate = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [telegraf_1.Telegraf])
], BotUpdate);
//# sourceMappingURL=bot.update.js.map