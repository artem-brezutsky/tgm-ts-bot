import { Controller, Get } from "@nestjs/common";
import { BotService } from "./bot.service";

@Controller('/api')
export class BotController {

    @Get('/token')
    public getInfo() {
    }
}