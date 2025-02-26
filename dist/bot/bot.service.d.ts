import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class BotService implements OnModuleInit {
    private configService;
    private bot;
    constructor(configService: ConfigService);
    onModuleInit(): Promise<void>;
}
