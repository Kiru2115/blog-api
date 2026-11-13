import { Command, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ArticleRepository } from '../../infra/database/article.repository';
import { ArticleNotFoundError } from '../../model/error/article.error';

export class UpdateArticleCommand extends Command<void> {
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

  async execute(command: UpdateArticleCommand): Promise<void> {
    const article = await this.articleRepository.findById(command.id);

    if (!article) {
      throw new ArticleNotFoundError(command.id);
    }

    await this.articleRepository.update(command.id, {
      title: command.title,
      content: command.content,
    });
  }
}
