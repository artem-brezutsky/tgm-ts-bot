import { Telegraf } from "telegraf";
export declare class BotUpdate {
    private readonly bot;
    constructor(bot: Telegraf);
    registerHandlers(): void;
}
