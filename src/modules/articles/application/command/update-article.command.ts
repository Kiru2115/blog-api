import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArticleRepository } from '../../infra/database/article.repository';
import { Article } from '../../model/article.model';
import { ArticleNotFoundError } from '../../model/error/article.error';

export class UpdateArticleCommand extends Command<Article> {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly content: string,
  ) {
    super();
  }
}

@CommandHandler(UpdateArticleCommand)
export class UpdateArticleHandler implements ICommandHandler<UpdateArticleCommand> {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(command: UpdateArticleCommand): Promise<Article> {
    const article = await this.articleRepository.findById(command.id);

    if (!article) {
      throw new ArticleNotFoundError(command.id);
    }

    return this.articleRepository.update(command.id, {
      title: command.title,
      content: command.content,
    });
  }
}
