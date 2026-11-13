import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from '../../../../../../core/http/auth/admin.guard';
import { GenericBadRequestResponse } from '../../../../../../core/http/response/bad-request.response';
import { ForbiddenResponse } from '../../../../../../core/http/response/forbidden.response';
import { GenericNotFoundResponse } from '../../../../../../core/http/response/not-found.response';
import { UnauthorizedResponse } from '../../../../../../core/http/response/unauthorized.response';
import { UuidParam } from '../../../../../../core/validation/decorator/uuid-v4-param.decorator';
import { UpdateArticleCommand } from '../../../../application/command/update-article.command';
import { ArticleRequest } from '../../request/article.request';

@ApiTags('articles')
@ApiBearerAuth('access-token')
@Controller('api/v1/articles')
export class UpdateArticleAction {
  constructor(private readonly commandBus: CommandBus) {}

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AdminGuard)
  @ApiOperation({
    summary: 'Replaces the title and the text of an article (admin only)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the article (UUID v4)',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description:
      'The article is changed. Its publication date stays the same. The answer has no body',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'The ID is not a valid UUID v4, or the data breaks a rule, or has fields the server owns or does not know',
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
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'There is no article with this ID',
    type: GenericNotFoundResponse,
  })
  async handle(
    @UuidParam('id') id: string,
    @Body() request: ArticleRequest,
  ): Promise<void> {
    await this.commandBus.execute(
      new UpdateArticleCommand(id, request.title, request.content),
    );
  }
}
