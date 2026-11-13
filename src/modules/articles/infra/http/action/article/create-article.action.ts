import { randomUUID } from 'node:crypto';
import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from '../../../../../../core/http/auth/admin.guard';
import { GenericBadRequestResponse } from '../../../../../../core/http/response/bad-request.response';
import { ForbiddenResponse } from '../../../../../../core/http/response/forbidden.response';
import { UnauthorizedResponse } from '../../../../../../core/http/response/unauthorized.response';
import { CreateArticleCommand } from '../../../../application/command/create-article.command';
import { GetArticleByIdQuery } from '../../../../application/query/get-article-by-id.query';
import { ArticleRequest } from '../../request/article.request';
import {
  ArticleResponse,
  toArticleResponse,
} from '../../response/article.response';

@ApiTags('articles')
@ApiBearerAuth('access-token')
@Controller('api/v1/articles')
export class CreateArticleAction {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Creates an article (admin only)' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new article',
    type: ArticleResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'The data breaks a rule, or has fields the server owns or does not know',
    type: GenericBadRequestResponse,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'There is no admin token',
    type: UnauthorizedResponse,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'The admin token is wrong',
    type: ForbiddenResponse,
  })
  async handle(@Body() request: ArticleRequest): Promise<ArticleResponse> {
    const id = randomUUID();

    // The command only writes. The new article is read back with a query.
    await this.commandBus.execute(
      new CreateArticleCommand(id, request.title, request.content),
    );
    const article = await this.queryBus.execute(new GetArticleByIdQuery(id));

    return toArticleResponse(article);
  }
}
