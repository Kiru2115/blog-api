import { Injectable } from '@nestjs/common';
import type { Article as ArticleRecord } from '../../../../../prisma/client/client';
import { PrismaService } from '../../../../core/prisma/prisma.service';
import { Article } from '../../model/article.model';

@Injectable()
export class ArticleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Article[]> {
    const records = await this.prisma.article.findMany({
      orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
    });

    return records.map((record) => toArticle(record));
  }

  async findById(id: string): Promise<Article | null> {
    const record = await this.prisma.article.findUnique({ where: { id } });

    return record ? toArticle(record) : null;
  }

  async create(article: Article): Promise<void> {
    await this.prisma.article.create({
      data: {
        id: article.id,
        title: article.title,
        content: article.content,
        publishedAt: article.publishedAt,
      },
    });
  }

  async update(
    id: string,
    data: Pick<Article, 'title' | 'content'>,
  ): Promise<void> {
    await this.prisma.article.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.article.delete({ where: { id } });
  }
}

function toArticle(record: ArticleRecord): Article {
  return new Article(
    record.id,
    record.title,
    record.content,
    record.publishedAt,
  );
}
