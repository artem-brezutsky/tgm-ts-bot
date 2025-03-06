import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { BotController } from './bot/bot.controller';

@Module({
  imports: [ConfigModule.forRoot(), BotModule],
  controllers: [BotController],
})
export class AppModule {}
