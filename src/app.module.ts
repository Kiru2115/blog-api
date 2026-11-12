import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ArticlesModule } from 'src/modules/articles/articles.module';
import { StatusController } from 'src/modules/status/status.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule.forRoot(),
    ArticlesModule,
  ],
  controllers: [StatusController],
})
export class AppModule {}
