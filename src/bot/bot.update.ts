import { Telegraf } from "telegraf";
import { Injectable } from "@nestjs/common";
import { handleCommand } from "./handlers/command.handler";
import { handleMessage } from "./handlers/message.handler";

@Injectable()
export class BotUpdate {
    constructor(private readonly bot: Telegraf) {
        this.registerHandlers();
    }

    registerHandlers() {
        this.bot.start(handleCommand);
        this.bot.on('message', handleMessage);
    }
}