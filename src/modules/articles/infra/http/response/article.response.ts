import { ApiProperty } from '@nestjs/swagger';
import { Article } from '../../../model/article.model';

export class ArticleResponse {
  @ApiProperty({
    description: 'ID of the article',
    format: 'uuid',
    example: '5e1f0a2b-0004-4000-8000-000000000004',
  })
  id: string;

  @ApiProperty({
    description: 'Title of the article',
    maxLength: 200,
    example: 'My first Nest.js API',
  })
  title: string;

  @ApiProperty({
    description: 'Text of the article',
    example:
      'How I built the API of this blog with Nest.js, Prisma and PostgreSQL, step by step.',
  })
  content: string;

  @ApiProperty({
    description: 'When the article was published',
    format: 'date-time',
    example: '2026-11-10T12:00:00.000Z',
  })
  publishedAt: string;
}

export function toArticleResponse(article: Article): ArticleResponse {
  return {
    id: article.id,
    title: article.title,
    content: article.content,
    publishedAt: article.publishedAt.toISOString(),
  };
}
