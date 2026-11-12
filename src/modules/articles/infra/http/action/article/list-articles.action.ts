import { Controller, Get, HttpStatus } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ListArticlesQuery } from '../../../../application/query/list-articles.query';
import {
  ArticleResponse,
  toArticleResponse,
} from '../../response/article.response';

@ApiTags('articles')
@Controller('api/v1/articles')
export class ListArticlesAction {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ summary: 'Lists all articles, newest first' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All articles, newest first. Empty when there are none.',
    type: ArticleResponse,
    isArray: true,
  })
  async handle(): Promise<ArticleResponse[]> {
    const articles = await this.queryBus.execute(new ListArticlesQuery());

    return articles.map((article) => toArticleResponse(article));
  }
}
