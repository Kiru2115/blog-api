import { Controller, Get, HttpStatus, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenericBadRequestResponse } from '../../../../../../core/http/response/bad-request.response';
import { GenericNotFoundResponse } from '../../../../../../core/http/response/not-found.response';
import { UuidParam } from '../../../../../../core/validation/decorator/uuid-v4-param.decorator';
import { GetArticleByIdQuery } from '../../../../application/query/get-article-by-id.query';
import { ArticleNotFoundError } from '../../../../model/error/article.error';
import {
  ArticleResponse,
  toArticleResponse,
} from '../../response/article.response';

@ApiTags('articles')
@Controller('api/v1/articles')
export class GetArticleAction {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':id')
  @ApiOperation({ summary: 'Returns one article by its ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the article (UUID v4)',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The whole article',
    type: ArticleResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'The ID is not a valid UUID v4',
    type: GenericBadRequestResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'There is no article with this ID',
    type: GenericNotFoundResponse,
  })
  async handle(@UuidParam('id') id: string): Promise<ArticleResponse> {
    try {
      const article = await this.queryBus.execute(new GetArticleByIdQuery(id));

      return toArticleResponse(article);
    } catch (error) {
      if (error instanceof ArticleNotFoundError) {
        throw new NotFoundException(error.message);
      }

      throw error;
    }
  }
}
