import { Module } from '@nestjs/common';
import { PrismaModule } from '../../core/prisma/prisma.module';
import {
  ACTIONS,
  COMMAND_HANDLERS,
  QUERY_HANDLERS,
  REPOSITORIES,
} from './articles.providers';

@Module({
  imports: [PrismaModule],
  controllers: [...ACTIONS],
  providers: [...QUERY_HANDLERS, ...COMMAND_HANDLERS, ...REPOSITORIES],
})
export class ArticlesModule {}
