import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArticleRepository } from '../../infra/database/article.repository';
import { Article } from '../../model/article.model';

export class CreateArticleCommand extends Command<Article> {
  constructor(
    readonly title: string,
    readonly content: string,
  ) {
    super();
  }
}

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(command: CreateArticleCommand): Promise<Article> {
    return this.articleRepository.create({
      title: command.title,
      content: command.content,
      publishedAt: new Date(),
    });
  }
}
