import { IQueryHandler, Query, QueryHandler } from '@nestjs/cqrs';
import { ArticleRepository } from '../../infra/database/article.repository';
import { Article } from '../../model/article.model';
import { ArticleNotFoundError } from '../../model/error/article.error';

export class GetArticleByIdQuery extends Query<Article> {
  constructor(readonly id: string) {
    super();
  }
}

@QueryHandler(GetArticleByIdQuery)
export class GetArticleByIdHandler implements IQueryHandler<GetArticleByIdQuery> {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(query: GetArticleByIdQuery): Promise<Article> {
    const article = await this.articleRepository.findById(query.id);

    if (!article) {
      throw new ArticleNotFoundError(query.id);
    }

    return article;
  }
}
