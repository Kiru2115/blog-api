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

  async create(
    data: Pick<Article, 'title' | 'content' | 'publishedAt'>,
  ): Promise<Article> {
    const record = await this.prisma.article.create({ data });

    return toArticle(record);
  }

  async update(
    id: string,
    data: Pick<Article, 'title' | 'content'>,
  ): Promise<Article> {
    const record = await this.prisma.article.update({ where: { id }, data });

    return toArticle(record);
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
