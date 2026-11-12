import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';
import { ArticleRepository } from '../../infra/database/article.repository';
import { Article } from '../../model/article.model';

export class ListArticlesQuery extends Query<Article[]> {}

@QueryHandler(ListArticlesQuery)
export class ListArticlesHandler implements IQueryHandler<ListArticlesQuery> {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(): Promise<Article[]> {
    return this.articleRepository.findAll();
  }
}
