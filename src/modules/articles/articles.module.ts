import { Module } from '@nestjs/common';
import { PrismaModule } from '../../core/prisma/prisma.module';
import { ACTIONS, QUERY_HANDLERS, REPOSITORIES } from './articles.providers';

@Module({
  imports: [PrismaModule],
  controllers: [...ACTIONS],
  providers: [...QUERY_HANDLERS, ...REPOSITORIES],
})
export class ArticlesModule {}
